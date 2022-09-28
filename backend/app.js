const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { validateSignUp, validateSignIn } = require('./middlewares/validation');
const { requireLogger, errorLogger } = require('./middlewares/logger');
const ValidationError = require('./errors/ValidationError');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

dotenv.config();
const { PORT = 3000 } = process.env;

/** Настроки CORS параметров (разрешены адреса и куки) */
const allowedCors = {
  origin: [
    'https://salatsr.nomoredomains.club',
    'https://salatsr.nomorepartiesxyz.ru',
    'http://localhost:3001',
    'https://localhost:3001',
  ],
  credentials: true,
};

const app = express();

/** подключаемся к серверу mongo */
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

/** Проверяем CORS параметры запросов */
app.use(cors(allowedCors));

/** Конвертируем запросы в формат json */
app.use(express.json());

/** Логгер запросов */
app.use(requireLogger);

/** Тест на автозапуск Node.js */
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/sign-up', validateSignUp, createUser);
app.post('/sign-in', validateSignIn, login);

app.use(cookieParser());
app.use(auth);

/** Защищённые маршруты */
app.use('/', userRouter);
app.use('/', cardRouter);
app.get('/sign-out', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

/** Логгер ошибок */
app.use(errorLogger);

/** Обработка ошибок */

/** Ошибки celebrate */
app.use(errors());

/** Ошибка 404 */
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

/** Централизованнный обработчик ошибок */
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка на сервере' : message,
  });
});

app.listen(PORT);
