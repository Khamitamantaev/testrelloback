# Project Title

Тестовое задание на позицию Стажер Backend (Node.js/NestJS)

## Description

1. Создаю RESTful API с авторизацией для trello (trello.com) на nestjs (https://docs.nestjs.com/);

2. Реализовываю функционал, схожий с trello, без подключение к Api trello;

3. Проектирую структуру БД при помощи https://dbdiagram.io 


### Executing program

* Как запустить программу
```
npm i
```
* Скопировать и заполнить .env
```
add .env
copy .env.example to .env
```

* Запуск(development)
```
npm run migrate
npm run seed
npm run start:dev
npm run studio
```

* Run prod
```
npm run build
npm run start
```

## Исполнитель
Хамит Амантаев
## Version History
* 0.1
    * Initial Release

## Используемые технологии
[Nest](https://docs.nestjs.com/)
[prisma](https://www.prisma.io/)


## Используемые статьи и доки
[Nest Authentication](https://docs.nestjs.com/security/authentication)
[Nest Authorization](https://docs.nestjs.com/security/authorization)
[Nest Prisma Auth](https://www.prisma.io/blog/nestjs-prisma-authentication-7D056s1s0k3l)