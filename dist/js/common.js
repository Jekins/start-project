/*! StartProject 12-02-2018 | Project base: Jekins.ru */
/* common ***********************/
//TestModule
var TestModule = (function () {
    var
        testText = 'Hello wold from jekins.ru!';

    return {
        init: function () {
            this.consoleTest();
        },
        consoleTest: function () {
            console.log(testText);
        }
    };
})();


//Init plugins
var Plugins = (function () {
    return {
        init: function () {
            //plugins
            TestModule.init();
        }
    };
})();

//Init blocks
var Blocks = (function () {
    return {
        init: function () {
            //blocksInitPlace - do not delete this comment!
        }
    };
})();


$(function () {
    Plugins.init();
    Blocks.init();
});
