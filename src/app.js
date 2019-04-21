(() => {

  const botui = new BotUI('chat-app');

  botui.message.bot({
    photo: true,
    delay: 1500,
    content: 'こんにちは、ボットのたにぐちさんです。よろしくおねがいします。'
  }).then(botInit);

  function botInit() {
    botui.message.bot({
      photo: true,
      delay: 1500,
      content: 'あなたの名前は？'
    }).then(() => {
      return botui.action.text({
        photo: true,
        action: {
          placeholder: 'Your name'
        }
      })
    }).then((res) => {
      botui.message.bot({
        photo: true,
        delay: 1500,
        content: res.value + 'さんですか。素敵な名前ですね。'
      }).then(() => {
        botui.message.bot({
          photo: true,
          delay: 1000,
          content: 'あなたの名前からイメージしてみました。こんな感じですか？'
        }).then(() => {
          botui.message.bot({
            photo: true,
            delay: 1000,
            loading: true,
            type: 'embed',
            content: 'https://thispersondoesnotexist.com'
          }).then(() => {
            return botui.action.button({
              delay: 1000,
              photo: true,
              action: [{
                icon: 'circle-thin',
                text: 'はい',
                value: true
              }, {
                icon: 'close',
                text: 'いいえ',
                value: false
              }]
            }).then((res) => {
              if(res.value) {
                return botui.message.bot({
                  photo: true,
                  delay: 1000,
                  content: 'yay'
                })
              } else {
                return botui.message.bot({
                  photo: true,
                  delay: 1000,
                  content: '反省します。'
                });
              }
            }).then(botLoop);
          });
        });
      });
    });
  }

  function botLoop() {
    botui.message.bot({
      photo: true,
      delay: 1500,
      content: '今、どんな気持ちですか？'
    }).then(() => {
      return botui.action.button({
        delay: 1000,
        photo: true,
        action: [{
          icon: 'apple',
          text: '楽しい',
          value: 'happy'
        }, {
          icon: 'android',
          text: 'ふつう',
          value: 'usual'
        }, {
          icon: 'close',
          text: '悲しい',
          value: 'sad'
        }]
      })
    }).then((res) => {
      if(res.value === 'happy'){
        return botui.message.bot({
          delay: 1000,
          photo: true,
          content: 'それはよかったですね！'
        });
      } else if(res.value === 'usual') {
        return botui.message.bot({
          delay: 1000,
          photo: true,
          content: 'ふつうが一番です'
        });
      } else {
        return botui.message.bot({
          delay: 1000,
          photo: true,
          content: 'きっと、いいことありますよ'
        });
      }
    }).then(() => {
      return botui.message.bot({
        photo: true,
        delay: 1500,
        content: 'まだ続けますか？'
      })
    }).then(() => {

      return botui.action.button({
        delay: 1000,
        action: [{
          icon: 'circle-thin',
          text: 'はい',
          value: true
        }, {
          icon: 'close',
          text: 'いいえ',
          value: false
        }]
      });
    }).then((res) => {

      res.value ? botLoop() : botEnd();
    });
  }

  function botEnd() {
    botui.message.bot({
      photo: true,
      delay: 1500,
      content: 'ご利用ありがとうございました！'
    })
  }

})();