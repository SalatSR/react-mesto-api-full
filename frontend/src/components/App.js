import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as authApi from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [selectedCard, setIsSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSucceed, setIsSucceed] = useState(null)
  const [userEmail, setUserEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      api.getUserData()
        .then(currentUser => setCurrentUser(currentUser))
        .catch(err => console.log(`Error: ${err}`))
      api.getInitialCards()
        .then(cards => setCards(cards))
        .catch(err => console.log(`Error: ${err}`))
    }
  }, [loggedIn]);

  /** Проверяем наличие токена в хранилище,
   * сверяем токены на устройстве и сервере.
   * Если есть логиним пользователя и отправляем на главную
   */
  useEffect(() => {
    let token = localStorage.getItem("jwt");
    if (token) {
      authApi.checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push('/');
        })
        .catch(err => console.log(err));
    };
  }, [history]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltip(false);
  }

  function handleUpdateUser(data) {
    api.setUserData(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  function handleUpdateAvatar(item) {
    api.editProfileAvatar(item)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  function handleCardLike(card) {

    function setLikeCardStatus(newCard) {
      setCards((state) => state.map(c => c._id === card._id ? newCard : c));
    }
    /** Снова проверяем, есть ли уже лайк на этой карточке */
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    if (!isLiked) {
      /** Отправляем запрос в API и получаем обновлённые данные карточки */
      api.likeCard(card._id)
        .then(newCard => setLikeCardStatus(newCard))
        .catch(err => console.log(`Error: ${err}`))
    } else {
      api.unlikeCard(card._id)
        .then(newCard => setLikeCardStatus(newCard))
        .catch(err => console.log(`Error: ${err}`))
    }
  }

  function handleCardDelete(card) {

    function setCardDeleteSatus() {
      setCards(cards => cards.filter(item => item._id !== card._id))
    }

    api.deleteCard(card._id)
      .then(() => setCardDeleteSatus())
      .catch(err => console.log(`Error: ${err}`))
  }

  function handleAddPlaceSubmit(item) {
    api.addNewCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`))
  }
  /** Логинимся, получаем токен,
   * записываем в хранилище,
   * отправляем на главную
   */
  function handleLogin(email, password) {
    return authApi.auth(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/');
      })
      .catch((err) => {
        setIsSucceed(false);
        setIsInfoTooltip(true);
        console.log(err)
      });
  }
  /** Регистрация, информируем об успешности/провале регистрации */
  function handleRegister(email, password) {
    authApi.reg(email, password)
      .then((res) => {
        setIsSucceed(true);
        setIsInfoTooltip(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsSucceed(false);
        setIsInfoTooltip(true);
        console.log(err)
      });
  }
  /** Проверяем адресс, на который ссылается кнопка в Header
   * если адрес ссылается на "/sign-out" - удаляем токен из хранилища
   * разлогиниваем пользователя
  */
  function onHeaderLinkClick(link) {
    if (link === "/sign-out") {
      localStorage.removeItem('jwt');
      setLoggedIn(false)
      history.push("/sign-in")
    }
  }

  return (
    <div id="page" className="page">
      <div id="page__content" className="page__content">
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
            >
              <Header
                link="/sign-out"
                userEmail={userEmail}
                btnText="Выйти"
                onHeaderLinkClick={onHeaderLinkClick}
              />
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Header
                link="/sign-in"
                btnText="Войти"
                onHeaderLinkClick={onHeaderLinkClick}
              />
              <Register
                handleRegister={handleRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Header
                link="/sign-up"
                btnText="Регистрация"
                onHeaderLinkClick={onHeaderLinkClick}
              />
              <Login
                handleLogin={handleLogin}
              />
            </Route>
            <Route>
              {loggedIn ?
                (<Redirect to="/" />
                ) : (
                  <Redirect to="/sign-in" />
                )}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name="submit-deleting"
            title="Вы уверены?"
            btnValue="Да"
            nameForm="submit-deleting"
            onClose={closeAllPopups}
          >
          </PopupWithForm>
          <ImagePopup
            name='image-view'
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            name='infotooltip'
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            isLogin={isSucceed}
            mainImgDiscription={isSucceed ? "Success" : "Fail"}
            loginStateTitle={isSucceed ?
              'Вы успешно зарегистрировались!' :
              'Что-то пошло не так! Попробуйте ещё раз.'}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;