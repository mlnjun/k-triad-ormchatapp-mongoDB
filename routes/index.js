const express = require('express');
const router = express.Router();
const { Member } = require('../models');

router.get('/login', (req, res) => {
  res.render('login', { title: '로그인' });
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Member.findOne({ username, password });

    if (user) {
      res.redirect('/chat');
    } else {
      res.render('login', { title: '로그인', error: '유효하지 않은 사용자명 또는 비밀번호입니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('내부 서버 오류');
  }
});

router.get('/entry', (req, res) => {
  res.render('entry', { title: '회원가입' });
});

router.post('/entry', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await Member.findOne({ username });

    if (existingUser) {
      res.render('entry', { title: '회원가입', error: '이미 존재하는 사용자명입니다.' });
    } else {
      const newUser = new Member({ username, password });
      await newUser.save();
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('내부 서버 오류');
  }
});


router.get('/find', (req, res) => {
  res.render('find', { title: '비밀번호 찾기' });
});

router.post('/find', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await Member.findOne({ username });

    if (user) {
      res.render('find', { title: '비밀번호 찾기', message: '귀하의 비밀번호는: ' + user.password });
    } else {
      res.render('find', { title: '비밀번호 찾기', error: '사용자명을 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('내부 서버 오류');
  }
});

module.exports = router;
