module.exports = {
  sets: {
    desktop: {
      files: 'test/hermione', // указывает путь к папке с тестами
    },
  },

  browsers: {
    chrome: {
      automationProtocol: 'devtools', // указывает использование протокола devtools для автоматизации
      desiredCapabilities: {
        browserName: 'chrome', // указывает имя браузера
      },
    },
  },

  windowSize: {
    width: 1920, // указывает ширину окна браузера
    height: 6000, // указывает высоту окна браузера
  },

  screenshotDelay: 3000, // указывает задержку перед созданием скриншота
  plugins: {
    'html-reporter/hermione': {
      enabled: true, // указывает включение плагина html-reporter/hermione
    },
  },

};
