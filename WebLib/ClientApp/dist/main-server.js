(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(6);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("./vendor");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(141);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(140);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BooksSortType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_domain_task__);

var BooksSortType;
(function (BooksSortType) {
    BooksSortType[BooksSortType["Date"] = 0] = "Date";
    BooksSortType[BooksSortType["Raiting"] = 1] = "Raiting";
    BooksSortType[BooksSortType["Views"] = 2] = "Views";
    BooksSortType[BooksSortType["Comments"] = 3] = "Comments";
})(BooksSortType || (BooksSortType = {}));
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    sortBooks: function (sortType) { return ({ type: 'SORT_BOOKS', sortType: sortType }); },
    requestBooks: function (filter) { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        if (filter !== getState().books.filter) {
            var fetchTask = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["fetch"])("api/SampleData/Books?filter=" + filter)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_BOOKS', filter: filter, books: data });
            });
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["addTask"])(fetchTask); // Ensure server-side prerendering waits for this to complete
            //dispatch({ type: 'REQUEST_BOOKS', filter: filter });
        }
    }; },
    requestCarouselBooks: function () { return function (dispatch, getState) {
        var fetchTask = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["fetch"])("api/SampleData/CarouselBooks")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'REQUEST_CAROUSEL_BOOKS', carouselBooks: data });
        });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["addTask"])(fetchTask); // Ensure server-side prerendering waits for this to complete
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
//const unloadedState: BooksState = { books: [], isLoading: false };
var unloadedState = { books: [], isLoading: false, filter: "null", carouselBooks: [] };
var BooksSorter = (function () {
    function BooksSorter() {
    }
    BooksSorter.sortBooks = function (state, incomingAction) {
        state.books.sort(this.getComparerFunction(incomingAction.sortType));
        return state.books;
    };
    BooksSorter.raitingComparer = function (a, b) {
        var aWeight = (a.assessment.average * 2) * a.assessment.assessmentsCount;
        var bWeight = (b.assessment.average * 2) * b.assessment.assessmentsCount;
        if (aWeight > bWeight)
            return -1;
        if (aWeight < bWeight)
            return 1;
        return 1;
    };
    BooksSorter.dateComparer = function (a, b) {
        if (a.uploadDate > b.uploadDate)
            return -1;
        if (a.uploadDate < b.uploadDate)
            return 1;
        return 1;
    };
    BooksSorter.commentsComparer = function (a, b) {
        if (a.commentCount > b.commentCount)
            return -1;
        if (a.commentCount < b.commentCount)
            return 1;
        return 1;
    };
    BooksSorter.getComparerFunction = function (sortType) {
        switch (sortType) {
            case BooksSortType.Date:
                return this.dateComparer;
            case BooksSortType.Raiting:
                return this.raitingComparer;
            case BooksSortType.Comments:
                return this.commentsComparer;
            default:
                return this.dateComparer;
        }
    };
    return BooksSorter;
}());
var reducer = function (state, incomingAction) {
    var action = incomingAction;
    switch (action.type) {
        case 'SORT_BOOKS':
            return {
                filter: state.filter,
                books: BooksSorter.sortBooks(state, action),
                carouselBooks: state.carouselBooks,
                isLoading: !state.isLoading
            };
        case 'REQUEST_BOOKS':
            return {
                filter: action.filter,
                books: state.books,
                carouselBooks: state.carouselBooks,
                isLoading: true
            };
        case 'RECEIVE_BOOKS':
            return {
                filter: action.filter,
                books: action.books,
                carouselBooks: state.carouselBooks,
                isLoading: !state.isLoading //false
            };
        case 'REQUEST_CAROUSEL_BOOKS':
            return {
                filter: state.filter,
                books: state.books,
                carouselBooks: action.carouselBooks,
                isLoading: !state.isLoading //false
            };
            ;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(135);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(142);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Breadcrumbs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Breadcrumbs = (function (_super) {
    __extends(Breadcrumbs, _super);
    function Breadcrumbs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Breadcrumbs.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ol", { className: "breadcrumb" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#" }, "Home")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#" }, "Library")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", { className: "active" }, "Data"));
    };
    return Breadcrumbs;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NavMenuItem__ = __webpack_require__(33);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

//import { NavLink } from 'react-router-dom';

var NavMenu = (function (_super) {
    __extends(NavMenu, _super);
    function NavMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavMenu.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("nav", { className: "navbar navbar-brand" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "container-fluid" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "navbar", className: "navbar-collapse collapse" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", { className: "nav nav-pills nav-justified" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__NavMenuItem__["a" /* NavMenuItem */], { url: "/genres", caption: "Жанры" })),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__NavMenuItem__["a" /* NavMenuItem */], { url: "/autors", caption: "Авторы" })),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__NavMenuItem__["a" /* NavMenuItem */], { url: "/", caption: "Книги" })),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__NavMenuItem__["a" /* NavMenuItem */], { url: "/series", caption: "Серии" })),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__NavMenuItem__["a" /* NavMenuItem */], { url: "/users", caption: "Пользователи" })),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__NavMenuItem__["a" /* NavMenuItem */], { url: "/admin", caption: "Админка" }))))));
    };
    return NavMenu;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_domain_task__);

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    getBookTextByID: function (bookId) { return function (dispatch, getState) {
        var fetchTask = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["fetch"])("api/SampleData/GetBookTextByID?bookId=" + bookId)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_BOOK_BODY', bookId: bookId, bookText: data.text });
        });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["addTask"])(fetchTask); // Ensure server-side prerendering waits for this to complete
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
//const unloadedState: BooksState = { books: [], isLoading: false };
var unloadedState = { bookId: 0, bookText: "" };
var reducer = function (state, incomingAction) {
    var action = incomingAction;
    switch (action.type) {
        case 'RECEIVE_BOOK_BODY':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                bookId: action.bookId,
                bookText: action.bookText
            };
        default:
            break;
    }
    return state || unloadedState;
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(47);




function configureStore(history, initialState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    var windowIfDefined = typeof window === 'undefined' ? null : window;
    // If devTools is installed, connect to it
    var devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__;
    var createStoreWithMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerMiddleware"])(history)), devToolsExtension ? devToolsExtension() : function (next) { return next; })(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"]);
    // Combine all reducers and instantiate the app-wide store instance
    var allReducers = buildRootReducer(__WEBPACK_IMPORTED_MODULE_3__store__["a" /* reducers */]);
    var store = createStoreWithMiddleware(allReducers, initialState);
    // Enable Webpack hot module replacement for reducers
    if (false) {
        module.hot.accept('./store', function () {
            var nextRootReducer = require('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }
    return store;
}
function buildRootReducer(allReducers) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])(Object.assign({}, allReducers, { routing: __WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerReducer"] }));
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_BooksContainer__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_BookBodyContainer__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__containers_AdminContainer__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__containers_AutorContainer__ = __webpack_require__(44);







//import FetchData from './components/FetchData';
//import Counter from './components/Counter';
var routes = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* Layout */], null,
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_3__containers_BooksContainer__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/bookContent/:bookId?', component: __WEBPACK_IMPORTED_MODULE_4__containers_BookBodyContainer__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/admin', component: __WEBPACK_IMPORTED_MODULE_5__containers_AdminContainer__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/autors', component: __WEBPACK_IMPORTED_MODULE_6__containers_AutorContainer__["a" /* default */] }));
//<Route path='/counter' component={Counter} />
//<Route path='/fetchdata/:startDateIndex?' component={ FetchData } />


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(132);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(137);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(139);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//download.js v4.21, by dandavis; 2008-2018. [MIT] see http://danml.com/download.html for tests/usage
;(function(root,factory){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):typeof exports=="object"?module.exports=factory():root.download=factory()})(this,function(){return function download(data,strFileName,strMimeType){var self=window,defaultMime="application/octet-stream",mimeType=strMimeType||defaultMime,payload=data,url=!strFileName&&!strMimeType&&payload,anchor=document.createElement("a"),toString=function(a){return String(a)},myBlob=self.Blob||self.MozBlob||self.WebKitBlob||toString,fileName=strFileName||"download",blob,reader;myBlob=myBlob.call?myBlob.bind(self):Blob,String(this)==="true"&&(payload=[payload,mimeType],mimeType=payload[0],payload=payload[1]);if(url&&url.length<2048){fileName=url.split("/").pop().split("?")[0],anchor.href=url;if(anchor.href.indexOf(url)!==-1){var ajax=new XMLHttpRequest;return ajax.open("GET",url,!0),ajax.responseType="blob",ajax.onload=function(e){download(e.target.response,fileName,defaultMime)},setTimeout(function(){ajax.send()},0),ajax}}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)){if(!(payload.length>2096103.424&&myBlob!==toString))return navigator.msSaveBlob?navigator.msSaveBlob(dataUrlToBlob(payload),fileName):saver(payload);payload=dataUrlToBlob(payload),mimeType=payload.type||defaultMime}else if(/([\x80-\xff])/.test(payload)){var i=0,tempUiArr=new Uint8Array(payload.length),mx=tempUiArr.length;for(i;i<mx;++i)tempUiArr[i]=payload.charCodeAt(i);payload=new myBlob([tempUiArr],{type:mimeType})}blob=payload instanceof myBlob?payload:new myBlob([payload],{type:mimeType});function dataUrlToBlob(strUrl){var parts=strUrl.split(/[:;,]/),type=parts[1],indexDecoder=strUrl.indexOf("charset")>0?3:2,decoder=parts[indexDecoder]=="base64"?atob:decodeURIComponent,binData=decoder(parts.pop()),mx=binData.length,i=0,uiArr=new Uint8Array(mx);for(i;i<mx;++i)uiArr[i]=binData.charCodeAt(i);return new myBlob([uiArr],{type:type})}function saver(url,winMode){if("download"in anchor)return anchor.href=url,anchor.setAttribute("download",fileName),anchor.className="download-js-link",anchor.innerHTML="downloading...",anchor.style.display="none",anchor.addEventListener("click",function(e){e.stopPropagation(),this.removeEventListener("click",arguments.callee)}),document.body.appendChild(anchor),setTimeout(function(){anchor.click(),document.body.removeChild(anchor),winMode===!0&&setTimeout(function(){self.URL.revokeObjectURL(anchor.href)},250)},66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(url)&&(url="data:"+url.replace(/^data:([\w\/\-\+]+)/,defaultMime)),window.open(url)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=url),!0;var f=document.createElement("iframe");document.body.appendChild(f),!winMode&&/^data:/.test(url)&&(url="data:"+url.replace(/^data:([\w\/\-\+]+)/,defaultMime)),f.src=url,setTimeout(function(){document.body.removeChild(f)},333)}if(navigator.msSaveBlob)return navigator.msSaveBlob(blob,fileName);if(self.URL)saver(self.URL.createObjectURL(blob),!0);else{if(typeof blob=="string"||blob.constructor===toString)try{return saver("data:"+mimeType+";base64,"+self.btoa(blob))}catch(y){return saver("data:"+mimeType+","+encodeURIComponent(blob))}reader=new FileReader,reader.onload=function(e){saver(this.result)},reader.readAsDataURL(blob)}return!0}});


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_history__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__configureStore__ = __webpack_require__(10);









/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__["createServerRenderer"])(function (params) {
    return new Promise(function (resolve, reject) {
        // Prepare Redux store with in-memory history, and dispatch a navigation event
        // corresponding to the incoming URL
        var basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
        var urlAfterBasename = params.url.substring(basename.length);
        var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__configureStore__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_history__["createMemoryHistory"])());
        store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__["replace"])(urlAfterBasename));
        // Prepare an instance of the application and perform an inital render that will
        // cause any async tasks (e.g., data access) to begin
        var routerContext = {};
        var app = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_redux__["Provider"], { store: store },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["StaticRouter"], { basename: basename, context: routerContext, location: params.location.path, children: __WEBPACK_IMPORTED_MODULE_7__routes__["a" /* routes */] })));
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(app);
        // If there's a redirection, just send this information back to the host application
        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url });
            return;
        }
        // Once any async tasks are done, we can perform the final render
        // We also send the redux store state, so the client can continue execution where the server left off
        params.domainTasks.then(function () {
            resolve({
                html: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(app),
                globals: { initialReduxState: store.getState() }
            });
        }, reject); // Also propagate any errors back into the host application
    });
}));


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Layout = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'container-fluid main-container' }, this.props.children);
    };
    return Layout;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddBook; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

//import { BookPreview } from './BookPreview';
//import * as BookStore from '../../store/books';
var AddBook = (function (_super) {
    __extends(AddBook, _super);
    function AddBook() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //constructor() {
    //    this.state
    //}
    AddBook.prototype.sendBook = function () {
        var customer = { contact_name: "Scott", company_name: "HP" };
        var model = {
            Name: "Shyju",
            Id: 123,
            Tags: [{ Id: 12, Code: "C" }, { Id: 33, Code: "Swift" }]
        };
        fetch("api/SampleData/AddBook", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(/*{ a: 1, b: 'Textual content' }*/ model)
        });
        //.then(function (date) {
        //    debugger
        //});
        //.then(res => res.json())
        //    .then(res => console.log(res));
    };
    AddBook.prototype.uploadImage = function () {
        var input = document.getElementById("bookImage");
        var blobFile = input.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            var output = document.getElementById('myImg');
            output.src = dataURL;
        };
        reader.readAsDataURL(blobFile);
    };
    AddBook.prototype.uploadBook = function () {
        var input = document.getElementById("bookContent");
        var blobFile = input.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            //var output = document.getElementById('myImg') as HTMLImageElement;
            //output.src = dataURL;
        };
        reader.readAsDataURL(blobFile);
    };
    AddBook.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "book island card" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { style: { textAlign: "center" } }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0444\u0430\u0439\u043B\u0430"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "row" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043D\u0438\u0433\u0438"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", name: "caption", className: "form-control" })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u0418\u043C\u044F \u0410\u0432\u0442\u043E\u0440\u0430"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", name: "autor", className: "form-control" })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "row" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u0416\u0430\u043D\u0440"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", name: "genre", className: "form-control" })),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u0413\u043E\u0434"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", name: "year", className: "form-control" }))),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "row" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u0421\u0435\u0440\u0438\u044F"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", name: "serie", className: "form-control" })),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", name: "pageCount", className: "form-control" }))),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "row" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", name: "Description", className: "form-control" })),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u0417\u0430\u0440\u0433\u0443\u0437\u0438\u0442\u044C"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: 'file', id: "bookContent", onChange: this.uploadBook.bind(this) }))),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "row" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", name: "Description", className: "form-control" }))),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "row" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u0417\u0430\u0440\u0433\u0443\u0436\u0435\u043D\u043D\u043E\u0435 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", name: "Description", className: "form-control" }))),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: 'file', id: "bookImage", accept: 'image/*', onChange: this.uploadImage.bind(this) }),
                    "\u041F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 no Image?",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("img", { id: "myImg", src: "#", alt: "your image", style: { width: "200px", height: "200px" } })),
                "\u0414\u0430\u043B\u0435\u0435 \u043F\u0435\u0440\u0435\u0445\u043E\u0434 \u043D\u0430 \u0444\u043E\u0440\u043C\u0443 \u043F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: "btn", onClick: this.sendBook },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'glyphicon glyphicon-download-alt' }),
                " \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043A\u043D\u0438\u0433\u0443"));
    };
    return AddBook;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Autor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BookList__ = __webpack_require__(20);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


//import { BookPreview } from './BookPreview';
//import * as BookStore from '../../store/books';
var Autor = (function (_super) {
    __extends(Autor, _super);
    function Autor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Autor.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "book island card" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { style: { textAlign: "center" } }, "\u0410\u0432\u0442\u043E\u0440"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                "\u0424\u043E\u0442\u043E, \u0431\u0438\u043E\u0433\u0440\u0430\u0444\u0438\u044F \u0441\u043F\u0438\u0441\u043E\u043A \u043A\u043D\u0438\u0433 \u0434\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F \u0434\u043E\u043C\u0430\u0448\u043D\u044F\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0441\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430 \u043A\u043D\u0438\u0433 \u043A\u043E\u043B\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__BookList__["a" /* BookList */], null)));
    };
    return Autor;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

//import { BookPreview } from './BookPreview';
//import * as BookStore from '../../store/books';
var BookList = (function (_super) {
    __extends(BookList, _super);
    function BookList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookList.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "book island card" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { style: { textAlign: "center" } }, "\u0410\u0432\u0442\u043E\u0440"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, "\u041A\u043D\u0438\u0433\u0430 1 \u043A\u043D\u0438\u0433\u0430 2 \u043A\u043D\u0438\u0433\u0430 3"));
    };
    return BookList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Book; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BookPreview__ = __webpack_require__(25);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var Book = (function (_super) {
    __extends(Book, _super);
    function Book() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Book.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "book island card" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { style: { textAlign: "center" } }, this.props.caption),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__BookPreview__["a" /* BookPreview */], __assign({}, this.props)));
    };
    return Book;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookAssessment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BookAssessment = (function (_super) {
    __extends(BookAssessment, _super);
    function BookAssessment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookAssessment.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            "\u041E\u0446\u0435\u043D\u043A\u0430",
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("br", null),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "glyphicon glyphicon-star", style: { color: "red" } }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null,
                "\u00A0",
                this.props.average,
                " (",
                this.props.assessmentsCount,
                ")"));
    };
    return BookAssessment;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookDescription; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BookDescription = (function (_super) {
    __extends(BookDescription, _super);
    function BookDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookDescription.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { style: { height: "150px", overflow: "hidden" } }, this.props.description);
    };
    return BookDescription;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookDownload; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_domain_task__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_domain_task___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_domain_task__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var BookDownload = (function (_super) {
    __extends(BookDownload, _super);
    function BookDownload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookDownload.prototype.downloadFile = function () {
        var download = __webpack_require__(15);
        var thos = this;
        var fetchTask = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_domain_task__["fetch"])("api/SampleData/GetBookTextByID?bookId=" + this.props.bookId)
            .then(function (resp) {
            return resp.blob();
        }).then(function (blob) {
            download(blob, thos.props.bookCaption + ".txt", "text/plain");
        });
    };
    BookDownload.prototype.render = function () {
        var groupName = "downloadFormat" + this.props.bookId;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, "\u0424\u043E\u0440\u043C\u0430\u0442"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { style: { display: "inline" } },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { style: { display: "inline" }, className: "", type: "radio", name: groupName, id: "fb2Id", value: "fb2", defaultChecked: true }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "label label-default", htmlFor: "fb2Id" }, "fb2")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { style: { display: "inline", paddingLeft: "10px" } },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { style: { display: "inline" }, className: "radio", type: "radio", name: groupName, id: "epubId", value: "epub" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "label label-default", htmlFor: "epubId" }, "epub")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: "btn", onClick: this.downloadFile.bind(this) },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'glyphicon glyphicon-download-alt' }),
                    " \u0421\u043A\u0430\u0447\u0430\u0442\u044C")));
    };
    return BookDownload;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookPreview; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PreviewDescription__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BookDownload__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__BookDescription__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__BookPreviewCommentsCounter__ = __webpack_require__(26);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};






var BookPreview = (function (_super) {
    __extends(BookPreview, _super);
    function BookPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookPreview.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("table", { style: { width: "100%" } },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tbody", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tr", null,
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", { style: { width: "260px" } },
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("img", { src: this.props.imageUrl, alt: "bookPicture" })),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "bookPreviewDescriptionContainer" },
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__PreviewDescription__["a" /* PreviewDescription */], __assign({}, this.props)),
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "previewGroup" },
                                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: "btn btn-success ", style: { width: "150px" } },
                                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { to: "/bookContent/" + this.props.bookId, activeClassName: 'active' },
                                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'glyphicon glyphicon-book' }),
                                            " \u0427\u0438\u0442\u0430\u0442\u044C"))),
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "previewGroup" },
                                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__BookPreviewCommentsCounter__["a" /* BookPreviewCommentsCounter */], { commentCount: this.props.commentCount })),
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "previewGroup" },
                                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__BookDownload__["a" /* BookDownload */], { bookId: this.props.bookId, bookCaption: this.props.caption })),
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "previewGroup" },
                                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__BookDescription__["a" /* BookDescription */], { description: this.props.description }))))))));
    };
    return BookPreview;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookPreviewCommentsCounter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BookPreviewCommentsCounter = (function (_super) {
    __extends(BookPreviewCommentsCounter, _super);
    function BookPreviewCommentsCounter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookPreviewCommentsCounter.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 (",
            this.props.commentCount,
            ")");
    };
    return BookPreviewCommentsCounter;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewDescription; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BookAssessment__ = __webpack_require__(22);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var PreviewDescription = (function (_super) {
    __extends(PreviewDescription, _super);
    function PreviewDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreviewDescription.prototype.renderBookAssessment = function () {
        if (this.props.assessment) {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__BookAssessment__["a" /* BookAssessment */], { average: this.props.assessment.average, assessmentsCount: this.props.assessment.assessmentsCount });
        }
        return null;
    };
    PreviewDescription.prototype.render = function () {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "previewGroup" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { style: { textAlign: "right" } },
                "\u0414\u0430\u0442\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F: ",
                new Date(this.props.uploadDate).toLocaleDateString("ru-RU", options),
                " \u00A0"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, this.renderBookAssessment()),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("br", null),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("br", null),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'desc1' }, " \u0410\u0432\u0442\u043E\u0440:"),
                " ",
                this.props.autor),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'desc1' }, " \u0416\u0430\u043D\u0440:"),
                " ",
                this.props.genre.join(", ")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'desc1' }, " \u0421\u0435\u0440\u0438\u044F:"),
                " ",
                this.props.series),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'desc1' }, " \u042F\u0437\u044B\u043A \u043A\u043D\u0438\u0433\u0438:"),
                " ",
                this.props.language),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'desc1' }, " \u0421\u0442\u0440\u0430\u043D\u0438\u0446:"),
                " ",
                this.props.pageCount));
    };
    return PreviewDescription;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooksList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__book_Book__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BooksListSorter__ = __webpack_require__(30);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var BooksList = (function (_super) {
    __extends(BooksList, _super);
    function BooksList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BooksList.prototype.renderBooks = function () {
        var resArr = [];
        if (!this.props.books)
            return resArr;
        for (var i = 0; i < this.props.books.length; i++) {
            var book = this.props.books[i];
            resArr.push(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__book_Book__["a" /* Book */], { key: i, imageUrl: book.imageUrl, autor: book.autor.toString(), caption: book.caption, series: book.series, bookId: book.bookId, description: book.description, assessment: book.assessment, genre: book.genre, language: book.language, pageCount: book.pageCount, uploadDate: book.uploadDate, commentCount: book.commentCount }));
        }
        return resArr;
    };
    BooksList.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row island' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__BooksListSorter__["a" /* BooksListSorter */], { sortBooks: this.props.sortBooks })),
            this.renderBooks());
    };
    return BooksList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooksListSortButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BooksListSortButton = (function (_super) {
    __extends(BooksListSortButton, _super);
    function BooksListSortButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getButtonClassName = function () {
            return "btn dropdown-toggle " + (_this.props.isActive ? "btn-primary" : "btn-default");
        };
        _this.renderButton = function () {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { onClick: _this.props.onButtonClick, className: _this.getButtonClassName(), type: "button", id: "dropdownMenu" + _this.props.sortTypeCaption, "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "true" }, _this.props.sortTypeCaption);
        };
        return _this;
    }
    BooksListSortButton.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "sortBtn" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "dropdown", style: { display: "inline" } }, this.renderButton()));
    };
    return BooksListSortButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

//<ul className="dropdown-menu" aria-labelledby={"dropdownMenu" + this.props.sortTypeCaption}>
//    <li><a href="#">неделя</a></li>
//    <li><a href="#">месяц</a></li>
//    <li><a href="#">год</a></li>
//    <li><a href="#">все время</a></li>
//</ul> 


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooksListSorter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BooksListSortButton__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Books__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var BooksListSorter = (function (_super) {
    __extends(BooksListSorter, _super);
    function BooksListSorter(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            sortType: __WEBPACK_IMPORTED_MODULE_2__store_Books__["b" /* BooksSortType */].Date
        };
        return _this;
    }
    BooksListSorter.prototype.getSortTypes = function () {
        return [
            { name: __WEBPACK_IMPORTED_MODULE_2__store_Books__["b" /* BooksSortType */].Date, caption: "Дата" },
            { name: __WEBPACK_IMPORTED_MODULE_2__store_Books__["b" /* BooksSortType */].Raiting, caption: "Рейтинг" },
            { name: __WEBPACK_IMPORTED_MODULE_2__store_Books__["b" /* BooksSortType */].Views, caption: "Просмотры" },
            { name: __WEBPACK_IMPORTED_MODULE_2__store_Books__["b" /* BooksSortType */].Comments, caption: "Комментарии" }
        ];
    };
    BooksListSorter.prototype.onButtonClick = function (value) {
        this.setState({
            sortType: value
        });
        this.props.sortBooks(value);
    };
    BooksListSorter.prototype.renderButtons = function () {
        var _this = this;
        return this.getSortTypes().map(function (btn, index) {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__BooksListSortButton__["a" /* BooksListSortButton */], { key: index, sortTypeCaption: btn.caption, onButtonClick: _this.onButtonClick.bind(_this, btn.name), isActive: _this.state.sortType === btn.name });
        });
    };
    BooksListSorter.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "booksContainerSorter" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, "\u043F\u043B\u0438\u0442\u043A\u0430/\u0441\u043F\u0438\u0441\u043E\u043A"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "sortCaption" }, "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E:"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "sortBtns" }, this.renderButtons()));
    };
    return BooksListSorter;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookCarousel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Carouselitem__ = __webpack_require__(32);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var BookCarousel = (function (_super) {
    __extends(BookCarousel, _super);
    function BookCarousel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            startIndex: 0
        };
        return _this;
    }
    BookCarousel.prototype.renderItems = function () {
        var result = [];
        for (var i = 0; i < 7; i++) {
            var book = this.props.books[i];
            result.push(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__Carouselitem__["a" /* CarouselItem */], { key: i, imageSrc: book ? book.imageUrl : "" })); //TODO
        }
        return result;
    };
    BookCarousel.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, " \u0411\u0435\u0441\u0442\u0446\u0435\u043B\u043B\u0435\u0440\u044B \u043C\u0435\u0441\u044F\u0446\u0430: "),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "carousel", style: { width: "100%" } }, this.renderItems()));
    };
    return BookCarousel;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarouselItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CarouselItem = (function (_super) {
    __extends(CarouselItem, _super);
    function CarouselItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CarouselItem.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "carouselItem" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("img", { src: this.props.imageSrc, alt: "bookPicture", width: 105, height: 165 }));
    };
    return CarouselItem;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavMenuItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var NavMenuItem = (function (_super) {
    __extends(NavMenuItem, _super);
    function NavMenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavMenuItem.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { to: this.props.url, activeClassName: 'active' }, this.props.caption);
    };
    return NavMenuItem;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooksSearch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CaptionInput__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CompletenessInput__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GenresInput__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__HideReadedBookInput__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LanguageInput__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__PageSizeInput__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__YearInput__ = __webpack_require__(42);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








var BooksSearch = (function (_super) {
    __extends(BooksSearch, _super);
    function BooksSearch(props) {
        var _this = _super.call(this, props) || this;
        _this.filterBooks = function (newState) {
            _this.props.requestBooks(JSON.stringify(newState || _this.state));
        };
        _this.state = {
            captionAutor: undefined,
            genre: undefined,
            language: undefined,
            minPageCount: 0,
            maxPageCount: undefined,
            minYear: 0,
            maxYear: undefined
        };
        return _this;
    }
    BooksSearch.prototype.updateFilter = function (evt) {
        debugger;
        var newState = {};
        Object.assign(newState, this.state);
        newState[evt.target.name] = evt.target.value;
        this.setState(newState);
    };
    BooksSearch.prototype.componentWillUpdate = function (nextProps, nextState) {
        this.filterBooks(nextState);
    };
    BooksSearch.prototype.updateFilterByEnterKeyPress = function (evt) {
        if (evt.key === 'Enter') {
            this.updateFilter(evt);
        }
    };
    BooksSearch.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h3", null, "\u041F\u043E\u0438\u0441\u043A \u043A\u043D\u0438\u0433"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__CaptionInput__["a" /* CaptionInput */], { updateFilter: this.updateFilter.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__GenresInput__["a" /* GenresInput */], { updateFilter: this.updateFilter.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__LanguageInput__["a" /* LanguageInput */], { updateFilter: this.updateFilter.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_7__YearInput__["a" /* YearInput */], { updateFilter: this.updateFilter.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__PageSizeInput__["a" /* PageSizeInput */], { updateFilter: this.updateFilter.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__CompletenessInput__["a" /* CompletenessInput */], { updateFilter: this.updateFilter.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__HideReadedBookInput__["a" /* HideReadedBookInput */], { updateFilter: this.updateFilter.bind(this) }),
                "\u041A\u043E\u043B\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432 \u043A\u043E\u043B\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432 \u0445\u043E\u0440\u043E\u0448\u0430\u044F \u043F\u0440\u0438\u0434\u0443\u043C\u043A\u0430 \u0434\u0432\u0443\u0445\u0443\u0440\u043E\u0432\u043D\u0435\u0432\u0430\u044F \u043E\u0431\u0435\u0440\u0442\u043A\u0430 \u043E\u0431\u043E\u043B\u0436\u043A\u0438 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043A\u043D\u0438\u0433\u0438 \u0437\u0430\u043A\u043E\u043D\u0447\u0435\u043D\u0430 \u043F\u0438\u0448\u0435\u0442\u0441\u044F \u0432\u044B\u043B\u043E\u0436\u0435\u043D\u0430 \u043D\u0435\u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E"));
    };
    return BooksSearch;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CaptionInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CaptionInput = (function (_super) {
    __extends(CaptionInput, _super);
    function CaptionInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaptionInput.prototype.handleKeyPress = function (evt) {
        if (evt.key === 'Enter') {
            this.props.updateFilter(evt);
        }
    };
    CaptionInput.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "search-item" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043D\u0438\u0433\u0438 \u0438\u043B\u0438 \u0430\u0432\u0442\u043E\u0440"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { onKeyDown: this.handleKeyPress.bind(this), type: "text", name: "captionAutor", className: "form-control" }));
    };
    return CaptionInput;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompletenessInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CompletenessInput = (function (_super) {
    __extends(CompletenessInput, _super);
    function CompletenessInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompletenessInput.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "search-item" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, "\u0417\u0430\u043A\u043E\u043D\u0447\u0435\u043D\u043D\u043E\u0441\u0442\u044C"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "dropdown menu-justify" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: "btn btn-default dropdown-toggle", type: "button", id: "dropdownMenu1", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "true" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "dropdownCaption" }, "\u0417\u0430\u043A\u043E\u043D\u0447\u0435\u043D"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "caret" })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", { className: "dropdown-menu ", "aria-labelledby": "dropdownMenu1" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#" }, "\u0417\u0430\u043A\u043E\u043D\u0447\u0435\u043D")),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#" }, "\u041F\u0438\u0448\u0435\u0442\u0441\u044F")),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#" }, "\u0417\u0430\u043C\u043E\u0440\u043E\u0436\u0435\u043D")))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "hidden", name: "completeness" }));
    };
    return CompletenessInput;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenresInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GenresList__ = __webpack_require__(38);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var GenresInput = (function (_super) {
    __extends(GenresInput, _super);
    function GenresInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenresInput.prototype.updateInput = function (evt) {
        debugger;
        this.refs.genre.innerHTML = evt.target.innerText;
    };
    GenresInput.prototype.onChange = function (evt) {
        //this.props.updateFilter
        //debuggerasdsd
        //(this.refs.genre as HTMLElement).innerHTML = evt.target.innerText;
    };
    GenresInput.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "search-item" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { type: "button", className: "btn btn-primary btn-lg ", "data-toggle": "modal", "data-target": "#myModal" }, "\u0416\u0430\u043D\u0440\u044B"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "modal fade", id: "myModal", tabIndex: -1, role: "dialog", "aria-labelledby": "myModalLabel" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "modal-dialog", role: "document" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "modal-content" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "modal-header" },
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { "aria-hidden": "true" }, "\u00D7")),
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h4", { className: "modal-title", id: "myModalLabel" }, "\u0416\u0430\u043D\u0440\u044B")),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "modal-body" },
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__GenresList__["a" /* GenresList */], null)),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "modal-footer" },
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { type: "button", className: "btn btn-default", "data-dismiss": "modal" }, "Close"),
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { type: "button", className: "btn btn-primary" }, "Save changes"))))));
        //return <div className="search-item" >
        //    <div>Жанры</div>
        //    <div className="dropdown menu-justify" >
        //        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu_genre" data-toggle="dropdown"
        //            aria-haspopup="true" aria-expanded="true">
        //            <input ref="genre" type="hidden" name="genre" id="ganresValue" onChange={this.props.updateFilter} />
        //            <span className="dropdownCaption">Жанры</span>
        //            <span className="caret"></span>
        //        </button>
        //        <ul className="dropdown-menu" aria-labelledby="dropdownMenu_genre" id="ganreslist" onClick={this.updateInput.bind(this)} >
        //            <li><a>Драма</a></li>
        //            <li><a>Боевики</a></li>
        //            <li><a>Роман</a></li>
        //            <li><a>Фантастика</a></li>
        //        </ul>
        //    </div>
        //</div>;
    };
    return GenresInput;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenresList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var GenresList = (function (_super) {
    __extends(GenresList, _super);
    function GenresList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenresList.prototype.getGenres = function () {
        return ["Фантастика и Фэнтези", "Детективы и Триллеры", "Поэзия и драматургия", "Юмор", "Старинная литература",
            "Дом и Семья", "Научно-образовательная", "Деловая литература", "Проза", "Компьютеры и Интернет", "Прочее", "Драматургия"];
    };
    GenresList.prototype.renderItems = function () {
        return this.getGenres().map(function (genre, index) { return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "checkbox", "aria-label": "..." }),
                genre)); });
    };
    GenresList.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "row" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-lg-6" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null,
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "checkbox", "aria-label": "..." }),
                        this.renderItems()))));
    };
    return GenresList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HideReadedBookInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var HideReadedBookInput = (function (_super) {
    __extends(HideReadedBookInput, _super);
    function HideReadedBookInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HideReadedBookInput.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "search-item" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "\u0421\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043D\u044B\u0435 \u043A\u043D\u0438\u0433\u0438 "),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "checkbox", className: "checkbox-inline" }));
    };
    return HideReadedBookInput;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguageInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var LanguageInput = (function (_super) {
    __extends(LanguageInput, _super);
    function LanguageInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LanguageInput.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "search-item" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, "\u042F\u0437\u044B\u043A"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "dropdown menu-justify" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: "btn btn-default dropdown-toggle", type: "button", id: "dropdownMenu_language", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "true" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "dropdownCaption" }, "\u042F\u0437\u044B\u043A"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "caret" })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", { className: "dropdown-menu ", "aria-labelledby": "dropdownMenu_language", onClick: this.props.updateFilter },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#" }, "\u0420\u0443\u0441\u0441\u043A\u0438\u0439")),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#" }, "\u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439")),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#" }, "\u041D\u0435\u043C\u0435\u0446\u043A\u0438\u0439")),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", { role: "separator", className: "divider" }),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "#" }, "\u0424\u0440\u0430\u043D\u0446\u0443\u0437\u0441\u043A\u0438\u0439")))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "hidden", name: "language" }));
    };
    return LanguageInput;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageSizeInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var PageSizeInput = (function (_super) {
    __extends(PageSizeInput, _super);
    function PageSizeInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageSizeInput.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "search-item" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, "\u041A\u043E\u043B\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446: "),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "row" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-xs-4" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", className: "form-control", onChange: this.props.updateFilter, name: "minYear" })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-xs-1" }, "\u0441\u0442\u0440."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-xs-4" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", className: "form-control", onChange: this.props.updateFilter, name: "minYear" })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-xs-1" }, "\u0441\u0442\u0440.")));
    };
    return PageSizeInput;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YearInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var YearInput = (function (_super) {
    __extends(YearInput, _super);
    function YearInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YearInput.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "search-item" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, "\u0413\u043E\u0434:"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "row" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-xs-4" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", className: "form-control", onChange: this.props.updateFilter, name: "minYear" })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-xs-1" }, " \u0433."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-xs-4" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "text", className: "form-control", onChange: this.props.updateFilter, name: "maxYear" })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-xs-1" }, " \u0433.")));
    };
    return YearInput;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_admin_AddBook__ = __webpack_require__(18);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


//type BooksContainerProps =
//    BooksState.BooksState
//    & typeof BooksState.actionCreators
//    & RouteComponentProps<{ startDateIndex: string }>;
var AdminContainer = (function (_super) {
    __extends(AdminContainer, _super);
    function AdminContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //componentWillMount() {
    //    this.props.requestBooks("");
    //    this.props.requestCarouselBooks();
    //}
    AdminContainer.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_admin_AddBook__["a" /* AddBook */], null));
    };
    return AdminContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (AdminContainer);
//export default connect(
//    (state: ApplicationState) => state.books, // Selects which state properties are merged into the component's props
//    BooksState.actionCreators                 // Selects which action creators are merged into the component's props
//)(BooksContainer) as typeof BooksContainer;


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_autor_Autor__ = __webpack_require__(19);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


//type BooksContainerProps =
//    BooksState.BooksState
//    & typeof BooksState.actionCreators
//    & RouteComponentProps<{ startDateIndex: string }>;
var AdminContainer = (function (_super) {
    __extends(AdminContainer, _super);
    function AdminContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //componentWillMount() {
    //    this.props.requestBooks("");
    //    this.props.requestCarouselBooks();
    //}
    AdminContainer.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__components_autor_Autor__["a" /* Autor */], null));
    };
    return AdminContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (AdminContainer);
//export default connect(
//    (state: ApplicationState) => state.books, // Selects which state properties are merged into the component's props
//    BooksState.actionCreators                 // Selects which action creators are merged into the component's props
//)(BooksContainer) as typeof BooksContainer;


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Breadcrumbs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_navMenu_NavMenu__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_BookBody__ = __webpack_require__(9);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var BookBodyContainer = (function (_super) {
    __extends(BookBodyContainer, _super);
    function BookBodyContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookBodyContainer.prototype.componentWillMount = function () {
        this.props.getBookTextByID(this.props.match.params.bookId);
    };
    BookBodyContainer.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "themes switcher"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row island' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_Breadcrumbs__["a" /* Breadcrumbs */], null),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__components_navMenu_NavMenu__["a" /* NavMenu */], null)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row' }, this.props.bookText));
    };
    return BookBodyContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function (state) { return state.bookBody; }, // Selects which state properties are merged into the component's props
__WEBPACK_IMPORTED_MODULE_4__store_BookBody__["a" /* actionCreators */] // Selects which action creators are merged into the component's props
)(BookBodyContainer));


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Breadcrumbs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_booksList_BooksList__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_carousel_BookCarousel__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_navMenu_NavMenu__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_search_BooksSearch__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__store_Books__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








var BooksContainer = (function (_super) {
    __extends(BooksContainer, _super);
    function BooksContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BooksContainer.prototype.componentWillMount = function () {
        this.props.requestBooks("");
        this.props.requestCarouselBooks();
    };
    BooksContainer.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "themes switcher"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row island' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__components_carousel_BookCarousel__["a" /* BookCarousel */], { books: this.props.carouselBooks }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_Breadcrumbs__["a" /* Breadcrumbs */], null),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__components_navMenu_NavMenu__["a" /* NavMenu */], null)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'col-sm-3 island' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__components_search_BooksSearch__["a" /* BooksSearch */], { requestBooks: this.props.requestBooks })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'col-sm-9' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__components_booksList_BooksList__["a" /* BooksList */], { books: this.props.books, sortBooks: this.props.sortBooks }))));
    };
    return BooksContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function (state) { return state.books; }, // Selects which state properties are merged into the component's props
__WEBPACK_IMPORTED_MODULE_7__store_Books__["a" /* actionCreators */] // Selects which action creators are merged into the component's props
)(BooksContainer));


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Books__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BookBody__ = __webpack_require__(9);


// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
var reducers = {
    books: __WEBPACK_IMPORTED_MODULE_0__Books__["c" /* reducer */],
    bookBody: __WEBPACK_IMPORTED_MODULE_1__BookBody__["b" /* reducer */]
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(143);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(70);

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzEyZGYxZWY4ZGJmMTFlNzZlODciLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC9yZWFjdC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvc3RvcmUvQm9va3MudHMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItcmVkdXgvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb21wb25lbnRzL0JyZWFkY3J1bWJzLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9uYXZNZW51L05hdk1lbnUudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9zdG9yZS9Cb29rQm9keS50cyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29uZmlndXJlU3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3JvdXRlcy50c3giLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9hc3BuZXQtcHJlcmVuZGVyaW5nL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2hpc3RvcnkvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtZG9tL3NlcnZlci5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2Rpc3QvZG93bmxvYWQubWluLmpzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9hZG1pbi9BZGRCb29rLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9hdXRvci9BdXRvci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYXV0b3IvQm9va0xpc3QudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb21wb25lbnRzL2Jvb2svQm9vay50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYm9vay9Cb29rQXNzZXNzbWVudC50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYm9vay9Cb29rRGVzY3JpcHRpb24udHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb21wb25lbnRzL2Jvb2svQm9va0Rvd25sb2FkLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9ib29rL0Jvb2tQcmV2aWV3LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9ib29rL0Jvb2tQcmV2aWV3Q29tbWVudHNDb3VudGVyLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9ib29rL1ByZXZpZXdEZXNjcmlwdGlvbi50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYm9va3NMaXN0L0Jvb2tzTGlzdC50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYm9va3NMaXN0L0Jvb2tzTGlzdFNvcnRCdXR0b24udHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb21wb25lbnRzL2Jvb2tzTGlzdC9Cb29rc0xpc3RTb3J0ZXIudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb21wb25lbnRzL2Nhcm91c2VsL0Jvb2tDYXJvdXNlbC50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvY2Fyb3VzZWwvQ2Fyb3VzZWxpdGVtLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9uYXZNZW51L05hdk1lbnVJdGVtLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9zZWFyY2gvQm9va3NTZWFyY2gudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb21wb25lbnRzL3NlYXJjaC9DYXB0aW9uSW5wdXQudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb21wb25lbnRzL3NlYXJjaC9Db21wbGV0ZW5lc3NJbnB1dC50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvc2VhcmNoL0dlbnJlc0lucHV0LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9zZWFyY2gvR2VucmVzTGlzdC50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvc2VhcmNoL0hpZGVSZWFkZWRCb29rSW5wdXQudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb21wb25lbnRzL3NlYXJjaC9MYW5ndWFnZUlucHV0LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9zZWFyY2gvUGFnZVNpemVJbnB1dC50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvc2VhcmNoL1llYXJJbnB1dC50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbnRhaW5lcnMvQWRtaW5Db250YWluZXIudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb250YWluZXJzL0F1dG9yQ29udGFpbmVyLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29udGFpbmVycy9Cb29rQm9keUNvbnRhaW5lci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbnRhaW5lcnMvQm9va3NDb250YWluZXIudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9zdG9yZS9pbmRleC50cyIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQSw2Qzs7Ozs7O0FDQUEscUM7Ozs7OztBQ0FBLCtDOzs7Ozs7QUNBQSwrQzs7Ozs7Ozs7Ozs7O0FD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QztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxDQXhCNEIsZ0RBQWUsR0F3QjNDO0FBRUQseURBQWUsMkVBQU8sQ0FDbEIsVUFBQyxLQUF1QixJQUFLLFlBQUssQ0FBQyxLQUFLLEVBQVgsQ0FBVyxFQUFFLHVFQUF1RTtBQUNqSCxvRUFBeUIsQ0FBaUIsc0VBQXNFO0NBQ25ILENBQUMsY0FBYyxDQUEwQixFQUFDOzs7Ozs7Ozs7OztBQzdDVjtBQUNNO0FBUXZDLHNHQUFzRztBQUN0Ryx3R0FBd0c7QUFDeEcsNERBQTREO0FBQ3JELElBQU0sUUFBUSxHQUFHO0lBQ3BCLEtBQUssRUFBRSx1REFBYTtJQUNwQixRQUFRLEVBQUUsMERBQWdCO0NBQzdCLENBQUM7Ozs7Ozs7QUNmRiwrQzs7Ozs7O0FDQUEsOEMiLCJmaWxlIjoibWFpbi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDcxMmRmMWVmOGRiZjExZTc2ZTg3IiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoNik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3ZlbmRvclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIi4vdmVuZG9yXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoMTQxKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoMTQwKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBmZXRjaCwgYWRkVGFzayB9IGZyb20gJ2RvbWFpbi10YXNrJztcclxuaW1wb3J0IHsgQWN0aW9uLCBSZWR1Y2VyLCBBY3Rpb25DcmVhdG9yIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgeyBBcHBUaHVua0FjdGlvbiB9IGZyb20gJy4vJztcclxuaW1wb3J0IHsgQm9vayB9IGZyb20gJy4uL2NvbXBvbmVudHMvYm9vay9Cb29rJztcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFNUQVRFIC0gVGhpcyBkZWZpbmVzIHRoZSB0eXBlIG9mIGRhdGEgbWFpbnRhaW5lZCBpbiB0aGUgUmVkdXggc3RvcmUuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJvb2tzU3RhdGUge1xyXG4gICAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gICAgZmlsdGVyPzogc3RyaW5nO1xyXG4gICAgYm9va3M6IEJvb2tJbmZvW107XHJcbiAgICBjYXJvdXNlbEJvb2tzOiBCb29rSW5mb1tdO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgQm9va0luZm8ge1xyXG4gICAgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIGJvb2tJZDogbnVtYmVyO1xyXG4gICAgYXV0b3I6IHN0cmluZztcclxuICAgIGNhcHRpb246IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBnZW5yZTogQXJyYXk8c3RyaW5nPjtcclxuICAgIHNlcmllczogc3RyaW5nO1xyXG4gICAgYXNzZXNzbWVudDogYW55O1xyXG4gICAgbGFuZ3VhZ2U6IHN0cmluZztcclxuICAgIHBhZ2VDb3VudDogbnVtYmVyO1xyXG4gICAgY29tbWVudENvdW50OiBudW1iZXI7XHJcbiAgICB1cGxvYWREYXRlOiBEYXRlO1xyXG59XHJcbmV4cG9ydCBlbnVtIEJvb2tzU29ydFR5cGUge1xyXG4gICAgRGF0ZSxcclxuICAgIFJhaXRpbmcsXHJcbiAgICBWaWV3cyxcclxuICAgIENvbW1lbnRzLFxyXG59XHJcblxyXG5pbnRlcmZhY2UgUmVxdWVzdENhcm91c2VsQm9va3NBY3Rpb24ge1xyXG4gICAgdHlwZTogJ1JFUVVFU1RfQ0FST1VTRUxfQk9PS1MnO1xyXG4gICAgY2Fyb3VzZWxCb29rczogQm9va0luZm9bXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlcXVlc3RCb29rc0FjdGlvbiB7XHJcbiAgICB0eXBlOiAnUkVRVUVTVF9CT09LUyc7XHJcbiAgICBmaWx0ZXI6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlY2VpdmVCb29rc0FjdGlvbiB7XHJcbiAgICB0eXBlOiAnUkVDRUlWRV9CT09LUyc7XHJcbiAgICBmaWx0ZXI6IHN0cmluZztcclxuICAgIGJvb2tzOiBCb29rSW5mb1tdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgU29ydEJvb2tzQWN0aW9uIHtcclxuICAgIHR5cGU6ICdTT1JUX0JPT0tTJyxcclxuICAgIHNvcnRUeXBlOiBCb29rc1NvcnRUeXBlO1xyXG59XHJcblxyXG4vLyBEZWNsYXJlIGEgJ2Rpc2NyaW1pbmF0ZWQgdW5pb24nIHR5cGUuIFRoaXMgZ3VhcmFudGVlcyB0aGF0IGFsbCByZWZlcmVuY2VzIHRvICd0eXBlJyBwcm9wZXJ0aWVzIGNvbnRhaW4gb25lIG9mIHRoZVxyXG4vLyBkZWNsYXJlZCB0eXBlIHN0cmluZ3MgKGFuZCBub3QgYW55IG90aGVyIGFyYml0cmFyeSBzdHJpbmcpLlxyXG50eXBlIEtub3duQWN0aW9uID0gUmVxdWVzdEJvb2tzQWN0aW9uIHwgUmVjZWl2ZUJvb2tzQWN0aW9uIHwgU29ydEJvb2tzQWN0aW9uIHwgUmVxdWVzdENhcm91c2VsQm9va3NBY3Rpb247XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEFDVElPTiBDUkVBVE9SUyAtIFRoZXNlIGFyZSBmdW5jdGlvbnMgZXhwb3NlZCB0byBVSSBjb21wb25lbnRzIHRoYXQgd2lsbCB0cmlnZ2VyIGEgc3RhdGUgdHJhbnNpdGlvbi5cclxuLy8gVGhleSBkb24ndCBkaXJlY3RseSBtdXRhdGUgc3RhdGUsIGJ1dCB0aGV5IGNhbiBoYXZlIGV4dGVybmFsIHNpZGUtZWZmZWN0cyAoc3VjaCBhcyBsb2FkaW5nIGRhdGEpLlxyXG5cclxuZXhwb3J0IGNvbnN0IGFjdGlvbkNyZWF0b3JzID0ge1xyXG4gICAgc29ydEJvb2tzOiAoc29ydFR5cGU6IEJvb2tzU29ydFR5cGUpID0+IDxTb3J0Qm9va3NBY3Rpb24+eyB0eXBlOiAnU09SVF9CT09LUycsIHNvcnRUeXBlOiBzb3J0VHlwZSB9LFxyXG5cclxuICAgIHJlcXVlc3RCb29rczogKGZpbHRlcjogc3RyaW5nKTogQXBwVGh1bmtBY3Rpb248S25vd25BY3Rpb24+ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICAgICAgICAvLyBPbmx5IGxvYWQgZGF0YSBpZiBpdCdzIHNvbWV0aGluZyB3ZSBkb24ndCBhbHJlYWR5IGhhdmUgKGFuZCBhcmUgbm90IGFscmVhZHkgbG9hZGluZylcclxuICAgICAgICBpZiAoZmlsdGVyICE9PSBnZXRTdGF0ZSgpLmJvb2tzLmZpbHRlcikge1xyXG4gICAgICAgICAgICBsZXQgZmV0Y2hUYXNrID0gZmV0Y2goYGFwaS9TYW1wbGVEYXRhL0Jvb2tzP2ZpbHRlcj0ke2ZpbHRlcn1gKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8Qm9va0luZm9bXT4pXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdSRUNFSVZFX0JPT0tTJywgZmlsdGVyOiBmaWx0ZXIsIGJvb2tzOiBkYXRhIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhZGRUYXNrKGZldGNoVGFzayk7IC8vIEVuc3VyZSBzZXJ2ZXItc2lkZSBwcmVyZW5kZXJpbmcgd2FpdHMgZm9yIHRoaXMgdG8gY29tcGxldGVcclxuICAgICAgICAgICAgLy9kaXNwYXRjaCh7IHR5cGU6ICdSRVFVRVNUX0JPT0tTJywgZmlsdGVyOiBmaWx0ZXIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlcXVlc3RDYXJvdXNlbEJvb2tzOiAoKTogQXBwVGh1bmtBY3Rpb248S25vd25BY3Rpb24+ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICAgICAgICBsZXQgZmV0Y2hUYXNrID0gZmV0Y2goYGFwaS9TYW1wbGVEYXRhL0Nhcm91c2VsQm9va3NgKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkgYXMgUHJvbWlzZTxCb29rSW5mb1tdPilcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdSRVFVRVNUX0NBUk9VU0VMX0JPT0tTJywgY2Fyb3VzZWxCb29rczogZGF0YSB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGFkZFRhc2soZmV0Y2hUYXNrKTsgLy8gRW5zdXJlIHNlcnZlci1zaWRlIHByZXJlbmRlcmluZyB3YWl0cyBmb3IgdGhpcyB0byBjb21wbGV0ZVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBSRURVQ0VSIC0gRm9yIGEgZ2l2ZW4gc3RhdGUgYW5kIGFjdGlvbiwgcmV0dXJucyB0aGUgbmV3IHN0YXRlLiBUbyBzdXBwb3J0IHRpbWUgdHJhdmVsLCB0aGlzIG11c3Qgbm90IG11dGF0ZSB0aGUgb2xkIHN0YXRlLlxyXG5cclxuLy9jb25zdCB1bmxvYWRlZFN0YXRlOiBCb29rc1N0YXRlID0geyBib29rczogW10sIGlzTG9hZGluZzogZmFsc2UgfTtcclxuY29uc3QgdW5sb2FkZWRTdGF0ZTogQm9va3NTdGF0ZSA9IHsgYm9va3M6IFtdLCBpc0xvYWRpbmc6IGZhbHNlLCBmaWx0ZXI6IFwibnVsbFwiLCBjYXJvdXNlbEJvb2tzOiBbXSB9O1xyXG5cclxuY2xhc3MgQm9va3NTb3J0ZXIge1xyXG4gICAgc3RhdGljIHNvcnRCb29rcyhzdGF0ZTogQm9va3NTdGF0ZSwgaW5jb21pbmdBY3Rpb246IFNvcnRCb29rc0FjdGlvbikge1xyXG4gICAgICAgIHN0YXRlLmJvb2tzLnNvcnQodGhpcy5nZXRDb21wYXJlckZ1bmN0aW9uKGluY29taW5nQWN0aW9uLnNvcnRUeXBlKSk7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlLmJvb2tzO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJhaXRpbmdDb21wYXJlcihhOiBCb29rSW5mbywgYjogQm9va0luZm8pIHtcclxuICAgICAgICBsZXQgYVdlaWdodCA9IChhLmFzc2Vzc21lbnQuYXZlcmFnZSAqIDIpICogYS5hc3Nlc3NtZW50LmFzc2Vzc21lbnRzQ291bnQ7XHJcbiAgICAgICAgbGV0IGJXZWlnaHQgPSAoYi5hc3Nlc3NtZW50LmF2ZXJhZ2UgKiAyKSAqIGIuYXNzZXNzbWVudC5hc3Nlc3NtZW50c0NvdW50O1xyXG4gICAgICAgIGlmIChhV2VpZ2h0ID4gYldlaWdodCkgcmV0dXJuIC0xO1xyXG4gICAgICAgIGlmIChhV2VpZ2h0IDwgYldlaWdodCkgcmV0dXJuIDE7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZGF0ZUNvbXBhcmVyKGE6IEJvb2tJbmZvLCBiOiBCb29rSW5mbykge1xyXG4gICAgICAgIGlmIChhLnVwbG9hZERhdGUgPiBiLnVwbG9hZERhdGUpIHJldHVybiAtMTtcclxuICAgICAgICBpZiAoYS51cGxvYWREYXRlIDwgYi51cGxvYWREYXRlKSByZXR1cm4gMTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjb21tZW50c0NvbXBhcmVyKGE6IEJvb2tJbmZvLCBiOiBCb29rSW5mbykge1xyXG4gICAgICAgIGlmIChhLmNvbW1lbnRDb3VudCA+IGIuY29tbWVudENvdW50KSByZXR1cm4gLTE7XHJcbiAgICAgICAgaWYgKGEuY29tbWVudENvdW50IDwgYi5jb21tZW50Q291bnQpIHJldHVybiAxO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldENvbXBhcmVyRnVuY3Rpb24oc29ydFR5cGU6IEJvb2tzU29ydFR5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKHNvcnRUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQm9va3NTb3J0VHlwZS5EYXRlOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUNvbXBhcmVyO1xyXG4gICAgICAgICAgICBjYXNlIEJvb2tzU29ydFR5cGUuUmFpdGluZzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJhaXRpbmdDb21wYXJlcjtcclxuICAgICAgICAgICAgY2FzZSBCb29rc1NvcnRUeXBlLkNvbW1lbnRzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tbWVudHNDb21wYXJlcjtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVDb21wYXJlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcjogUmVkdWNlcjxCb29rc1N0YXRlPiA9IChzdGF0ZTogQm9va3NTdGF0ZSwgaW5jb21pbmdBY3Rpb246IEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gaW5jb21pbmdBY3Rpb24gYXMgS25vd25BY3Rpb247XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnU09SVF9CT09LUyc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHN0YXRlLmZpbHRlcixcclxuICAgICAgICAgICAgICAgIGJvb2tzOiBCb29rc1NvcnRlci5zb3J0Qm9va3Moc3RhdGUsIGFjdGlvbiksXHJcbiAgICAgICAgICAgICAgICBjYXJvdXNlbEJvb2tzOiBzdGF0ZS5jYXJvdXNlbEJvb2tzLFxyXG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiAhc3RhdGUuaXNMb2FkaW5nXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgY2FzZSAnUkVRVUVTVF9CT09LUyc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGFjdGlvbi5maWx0ZXIsXHJcbiAgICAgICAgICAgICAgICBib29rczogc3RhdGUuYm9va3MsXHJcbiAgICAgICAgICAgICAgICBjYXJvdXNlbEJvb2tzOiBzdGF0ZS5jYXJvdXNlbEJvb2tzLFxyXG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgY2FzZSAnUkVDRUlWRV9CT09LUyc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGFjdGlvbi5maWx0ZXIsXHJcbiAgICAgICAgICAgICAgICBib29rczogYWN0aW9uLmJvb2tzLFxyXG4gICAgICAgICAgICAgICAgY2Fyb3VzZWxCb29rczogc3RhdGUuY2Fyb3VzZWxCb29rcyxcclxuICAgICAgICAgICAgICAgIGlzTG9hZGluZzogIXN0YXRlLmlzTG9hZGluZy8vZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAnUkVRVUVTVF9DQVJPVVNFTF9CT09LUyc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHN0YXRlLmZpbHRlcixcclxuICAgICAgICAgICAgICAgIGJvb2tzOiBzdGF0ZS5ib29rcyxcclxuICAgICAgICAgICAgICAgIGNhcm91c2VsQm9va3M6IGFjdGlvbi5jYXJvdXNlbEJvb2tzLFxyXG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiAhc3RhdGUuaXNMb2FkaW5nLy9mYWxzZVxyXG4gICAgICAgICAgICB9OztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGxpbmUgZ3VhcmFudGVlcyB0aGF0IGV2ZXJ5IGFjdGlvbiBpbiB0aGUgS25vd25BY3Rpb24gdW5pb24gaGFzIGJlZW4gY292ZXJlZCBieSBhIGNhc2UgYWJvdmVcclxuICAgICAgICAgICAgY29uc3QgZXhoYXVzdGl2ZUNoZWNrOiBuZXZlciA9IGFjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RhdGUgfHwgdW5sb2FkZWRTdGF0ZTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3N0b3JlL0Jvb2tzLnRzIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoMTM1KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvZG9tYWluLXRhc2svaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMSkpKDE0Mik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPG9sIGNsYXNzTmFtZT1cImJyZWFkY3J1bWJcIj5cclxuICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+SG9tZTwvYT48L2xpPlxyXG4gICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5MaWJyYXJ5PC9hPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJhY3RpdmVcIj5EYXRhPC9saT5cclxuICAgICAgICA8L29sPjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9CcmVhZGNydW1icy50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbi8vaW1wb3J0IHsgTmF2TGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBOYXZNZW51SXRlbSB9IGZyb20gJy4vTmF2TWVudUl0ZW0nO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdk1lbnUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItYnJhbmRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJuYXZiYXJcIiBjbGFzc05hbWU9XCJuYXZiYXItY29sbGFwc2UgY29sbGFwc2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi1waWxscyBuYXYtanVzdGlmaWVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZNZW51SXRlbSB1cmw9XCIvZ2VucmVzXCIgY2FwdGlvbj1cItCW0LDQvdGA0YtcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TWVudUl0ZW0gdXJsPVwiL2F1dG9yc1wiIGNhcHRpb249XCLQkNCy0YLQvtGA0YtcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TWVudUl0ZW0gdXJsPVwiL1wiIGNhcHRpb249XCLQmtC90LjQs9C4XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdk1lbnVJdGVtIHVybD1cIi9zZXJpZXNcIiBjYXB0aW9uPVwi0KHQtdGA0LjQuFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZNZW51SXRlbSB1cmw9XCIvdXNlcnNcIiBjYXB0aW9uPVwi0J/QvtC70YzQt9C+0LLQsNGC0LXQu9C4XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdk1lbnVJdGVtIHVybD1cIi9hZG1pblwiIGNhcHRpb249XCLQkNC00LzQuNC90LrQsFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L25hdj47XHJcbiAgICB9XHJcbn0gICAgICAgICAgICBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9uYXZNZW51L05hdk1lbnUudHN4IiwiaW1wb3J0IHsgZmV0Y2gsIGFkZFRhc2sgfSBmcm9tICdkb21haW4tdGFzayc7XHJcbmltcG9ydCB7IEFjdGlvbiwgUmVkdWNlciwgQWN0aW9uQ3JlYXRvciB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHsgQXBwVGh1bmtBY3Rpb24gfSBmcm9tICcuLyc7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBTVEFURSAtIFRoaXMgZGVmaW5lcyB0aGUgdHlwZSBvZiBkYXRhIG1haW50YWluZWQgaW4gdGhlIFJlZHV4IHN0b3JlLlxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCb29rQm9keVN0YXRlIHtcclxuICAgIGJvb2tJZDogbnVtYmVyO1xyXG4gICAgYm9va1RleHQ6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlY2VpdmVCb29rQm9keUFjdGlvbiB7XHJcbiAgICB0eXBlOiAnUkVDRUlWRV9CT09LX0JPRFknO1xyXG4gICAgYm9va0lkOiBudW1iZXI7XHJcbiAgICBib29rVGV4dDogc3RyaW5nO1xyXG59XHJcblxyXG4vLyBEZWNsYXJlIGEgJ2Rpc2NyaW1pbmF0ZWQgdW5pb24nIHR5cGUuIFRoaXMgZ3VhcmFudGVlcyB0aGF0IGFsbCByZWZlcmVuY2VzIHRvICd0eXBlJyBwcm9wZXJ0aWVzIGNvbnRhaW4gb25lIG9mIHRoZVxyXG4vLyBkZWNsYXJlZCB0eXBlIHN0cmluZ3MgKGFuZCBub3QgYW55IG90aGVyIGFyYml0cmFyeSBzdHJpbmcpLlxyXG50eXBlIEtub3duQWN0aW9uID0gUmVjZWl2ZUJvb2tCb2R5QWN0aW9uO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBBQ1RJT04gQ1JFQVRPUlMgLSBUaGVzZSBhcmUgZnVuY3Rpb25zIGV4cG9zZWQgdG8gVUkgY29tcG9uZW50cyB0aGF0IHdpbGwgdHJpZ2dlciBhIHN0YXRlIHRyYW5zaXRpb24uXHJcbi8vIFRoZXkgZG9uJ3QgZGlyZWN0bHkgbXV0YXRlIHN0YXRlLCBidXQgdGhleSBjYW4gaGF2ZSBleHRlcm5hbCBzaWRlLWVmZmVjdHMgKHN1Y2ggYXMgbG9hZGluZyBkYXRhKS5cclxuXHJcbmV4cG9ydCBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHtcclxuICAgIGdldEJvb2tUZXh0QnlJRDogKGJvb2tJZDogbnVtYmVyKTogQXBwVGh1bmtBY3Rpb248S25vd25BY3Rpb24+ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICAgICAgICBsZXQgZmV0Y2hUYXNrID0gZmV0Y2goYGFwaS9TYW1wbGVEYXRhL0dldEJvb2tUZXh0QnlJRD9ib29rSWQ9JHtib29rSWR9YClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8c3RyaW5nPilcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnUkVDRUlWRV9CT09LX0JPRFknLCBib29rSWQ6IGJvb2tJZCwgYm9va1RleHQ6IGRhdGEudGV4dCB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgYWRkVGFzayhmZXRjaFRhc2spOyAvLyBFbnN1cmUgc2VydmVyLXNpZGUgcHJlcmVuZGVyaW5nIHdhaXRzIGZvciB0aGlzIHRvIGNvbXBsZXRlXHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFJFRFVDRVIgLSBGb3IgYSBnaXZlbiBzdGF0ZSBhbmQgYWN0aW9uLCByZXR1cm5zIHRoZSBuZXcgc3RhdGUuIFRvIHN1cHBvcnQgdGltZSB0cmF2ZWwsIHRoaXMgbXVzdCBub3QgbXV0YXRlIHRoZSBvbGQgc3RhdGUuXHJcblxyXG4vL2NvbnN0IHVubG9hZGVkU3RhdGU6IEJvb2tzU3RhdGUgPSB7IGJvb2tzOiBbXSwgaXNMb2FkaW5nOiBmYWxzZSB9O1xyXG5jb25zdCB1bmxvYWRlZFN0YXRlOiBCb29rQm9keVN0YXRlID0geyBib29rSWQ6IDAsIGJvb2tUZXh0OiBcIlwiIH07XHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcjogUmVkdWNlcjxCb29rQm9keVN0YXRlPiA9IChzdGF0ZTogQm9va0JvZHlTdGF0ZSwgaW5jb21pbmdBY3Rpb246IEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gaW5jb21pbmdBY3Rpb24gYXMgS25vd25BY3Rpb247XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnUkVDRUlWRV9CT09LX0JPRFknOlxyXG4gICAgICAgICAgICAvLyBPbmx5IGFjY2VwdCB0aGUgaW5jb21pbmcgZGF0YSBpZiBpdCBtYXRjaGVzIHRoZSBtb3N0IHJlY2VudCByZXF1ZXN0LiBUaGlzIGVuc3VyZXMgd2UgY29ycmVjdGx5XHJcbiAgICAgICAgICAgIC8vIGhhbmRsZSBvdXQtb2Ytb3JkZXIgcmVzcG9uc2VzLlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYm9va0lkOiBhY3Rpb24uYm9va0lkLFxyXG4gICAgICAgICAgICAgICAgYm9va1RleHQ6IGFjdGlvbi5ib29rVGV4dFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBsaW5lIGd1YXJhbnRlZXMgdGhhdCBldmVyeSBhY3Rpb24gaW4gdGhlIEtub3duQWN0aW9uIHVuaW9uIGhhcyBiZWVuIGNvdmVyZWQgYnkgYSBjYXNlIGFib3ZlXHJcbiAgICAgICAgLy9jb25zdCBleGhhdXN0aXZlQ2hlY2s6IG5ldmVyID0gYWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdGF0ZSB8fCB1bmxvYWRlZFN0YXRlO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvc3RvcmUvQm9va0JvZHkudHMiLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlLCBjb21iaW5lUmVkdWNlcnMsIEdlbmVyaWNTdG9yZUVuaGFuY2VyLCBTdG9yZSwgU3RvcmVFbmhhbmNlclN0b3JlQ3JlYXRvciwgUmVkdWNlcnNNYXBPYmplY3QgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XHJcbmltcG9ydCB7IHJvdXRlclJlZHVjZXIsIHJvdXRlck1pZGRsZXdhcmUgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xyXG5pbXBvcnQgKiBhcyBTdG9yZU1vZHVsZSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25TdGF0ZSwgcmVkdWNlcnMgfSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ2hpc3RvcnknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uZmlndXJlU3RvcmUoaGlzdG9yeTogSGlzdG9yeSwgaW5pdGlhbFN0YXRlPzogQXBwbGljYXRpb25TdGF0ZSkge1xyXG4gICAgLy8gQnVpbGQgbWlkZGxld2FyZS4gVGhlc2UgYXJlIGZ1bmN0aW9ucyB0aGF0IGNhbiBwcm9jZXNzIHRoZSBhY3Rpb25zIGJlZm9yZSB0aGV5IHJlYWNoIHRoZSBzdG9yZS5cclxuICAgIGNvbnN0IHdpbmRvd0lmRGVmaW5lZCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdyBhcyBhbnk7XHJcbiAgICAvLyBJZiBkZXZUb29scyBpcyBpbnN0YWxsZWQsIGNvbm5lY3QgdG8gaXRcclxuICAgIGNvbnN0IGRldlRvb2xzRXh0ZW5zaW9uID0gd2luZG93SWZEZWZpbmVkICYmIHdpbmRvd0lmRGVmaW5lZC5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fIGFzICgpID0+IEdlbmVyaWNTdG9yZUVuaGFuY2VyO1xyXG4gICAgY29uc3QgY3JlYXRlU3RvcmVXaXRoTWlkZGxld2FyZSA9IGNvbXBvc2UoXHJcbiAgICAgICAgYXBwbHlNaWRkbGV3YXJlKHRodW5rLCByb3V0ZXJNaWRkbGV3YXJlKGhpc3RvcnkpKSxcclxuICAgICAgICBkZXZUb29sc0V4dGVuc2lvbiA/IGRldlRvb2xzRXh0ZW5zaW9uKCkgOiA8Uz4obmV4dDogU3RvcmVFbmhhbmNlclN0b3JlQ3JlYXRvcjxTPikgPT4gbmV4dFxyXG4gICAgKShjcmVhdGVTdG9yZSk7XHJcblxyXG4gICAgLy8gQ29tYmluZSBhbGwgcmVkdWNlcnMgYW5kIGluc3RhbnRpYXRlIHRoZSBhcHAtd2lkZSBzdG9yZSBpbnN0YW5jZVxyXG4gICAgY29uc3QgYWxsUmVkdWNlcnMgPSBidWlsZFJvb3RSZWR1Y2VyKHJlZHVjZXJzKTtcclxuICAgIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmVXaXRoTWlkZGxld2FyZShhbGxSZWR1Y2VycywgaW5pdGlhbFN0YXRlKSBhcyBTdG9yZTxBcHBsaWNhdGlvblN0YXRlPjtcclxuXHJcbiAgICAvLyBFbmFibGUgV2VicGFjayBob3QgbW9kdWxlIHJlcGxhY2VtZW50IGZvciByZWR1Y2Vyc1xyXG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcclxuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgnLi9zdG9yZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmV4dFJvb3RSZWR1Y2VyID0gcmVxdWlyZTx0eXBlb2YgU3RvcmVNb2R1bGU+KCcuL3N0b3JlJyk7XHJcbiAgICAgICAgICAgIHN0b3JlLnJlcGxhY2VSZWR1Y2VyKGJ1aWxkUm9vdFJlZHVjZXIobmV4dFJvb3RSZWR1Y2VyLnJlZHVjZXJzKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0b3JlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZFJvb3RSZWR1Y2VyKGFsbFJlZHVjZXJzOiBSZWR1Y2Vyc01hcE9iamVjdCkge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVSZWR1Y2VyczxBcHBsaWNhdGlvblN0YXRlPihPYmplY3QuYXNzaWduKHt9LCBhbGxSZWR1Y2VycywgeyByb3V0aW5nOiByb3V0ZXJSZWR1Y2VyIH0pKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29uZmlndXJlU3RvcmUudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IExheW91dCB9IGZyb20gJy4vY29tcG9uZW50cy9MYXlvdXQnO1xyXG5pbXBvcnQgQm9va3NDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL0Jvb2tzQ29udGFpbmVyJztcclxuaW1wb3J0IEJvb2tCb2R5Q29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9Cb29rQm9keUNvbnRhaW5lcic7XHJcbmltcG9ydCBBZG1pbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvQWRtaW5Db250YWluZXInO1xyXG5pbXBvcnQgeyBIb21lIH0gZnJvbSAnLi9jb21wb25lbnRzL0hvbWUnO1xyXG5pbXBvcnQgQXV0b3JDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL0F1dG9yQ29udGFpbmVyJztcclxuXHJcbi8vaW1wb3J0IEZldGNoRGF0YSBmcm9tICcuL2NvbXBvbmVudHMvRmV0Y2hEYXRhJztcclxuLy9pbXBvcnQgQ291bnRlciBmcm9tICcuL2NvbXBvbmVudHMvQ291bnRlcic7XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVzID0gPExheW91dD5cclxuICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvJyBjb21wb25lbnQ9e0Jvb2tzQ29udGFpbmVyfSAvPlxyXG4gICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9ib29rQ29udGVudC86Ym9va0lkPycgY29tcG9uZW50PXtCb29rQm9keUNvbnRhaW5lcn0gLz5cclxuICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvYWRtaW4nIGNvbXBvbmVudD17QWRtaW5Db250YWluZXJ9IC8+XHJcbiAgICA8Um91dGUgZXhhY3QgcGF0aD0nL2F1dG9ycycgY29tcG9uZW50PXtBdXRvckNvbnRhaW5lcn0gLz5cclxuPC9MYXlvdXQ+O1xyXG5cclxuICAgIC8vPFJvdXRlIHBhdGg9Jy9jb3VudGVyJyBjb21wb25lbnQ9e0NvdW50ZXJ9IC8+XHJcbiAgICAvLzxSb3V0ZSBwYXRoPScvZmV0Y2hkYXRhLzpzdGFydERhdGVJbmRleD8nIGNvbXBvbmVudD17IEZldGNoRGF0YSB9IC8+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9yb3V0ZXMudHN4IiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygxKSkoMTMyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMSkpKDEzNyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2hpc3RvcnkvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSgxMzkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vc2VydmVyLmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy9kb3dubG9hZC5qcyB2NC4yMSwgYnkgZGFuZGF2aXM7IDIwMDgtMjAxOC4gW01JVF0gc2VlIGh0dHA6Ly9kYW5tbC5jb20vZG93bmxvYWQuaHRtbCBmb3IgdGVzdHMvdXNhZ2VcbjsoZnVuY3Rpb24ocm9vdCxmYWN0b3J5KXt0eXBlb2YgZGVmaW5lPT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGZhY3RvcnkpOnR5cGVvZiBleHBvcnRzPT1cIm9iamVjdFwiP21vZHVsZS5leHBvcnRzPWZhY3RvcnkoKTpyb290LmRvd25sb2FkPWZhY3RvcnkoKX0pKHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gZG93bmxvYWQoZGF0YSxzdHJGaWxlTmFtZSxzdHJNaW1lVHlwZSl7dmFyIHNlbGY9d2luZG93LGRlZmF1bHRNaW1lPVwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsbWltZVR5cGU9c3RyTWltZVR5cGV8fGRlZmF1bHRNaW1lLHBheWxvYWQ9ZGF0YSx1cmw9IXN0ckZpbGVOYW1lJiYhc3RyTWltZVR5cGUmJnBheWxvYWQsYW5jaG9yPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpLHRvU3RyaW5nPWZ1bmN0aW9uKGEpe3JldHVybiBTdHJpbmcoYSl9LG15QmxvYj1zZWxmLkJsb2J8fHNlbGYuTW96QmxvYnx8c2VsZi5XZWJLaXRCbG9ifHx0b1N0cmluZyxmaWxlTmFtZT1zdHJGaWxlTmFtZXx8XCJkb3dubG9hZFwiLGJsb2IscmVhZGVyO215QmxvYj1teUJsb2IuY2FsbD9teUJsb2IuYmluZChzZWxmKTpCbG9iLFN0cmluZyh0aGlzKT09PVwidHJ1ZVwiJiYocGF5bG9hZD1bcGF5bG9hZCxtaW1lVHlwZV0sbWltZVR5cGU9cGF5bG9hZFswXSxwYXlsb2FkPXBheWxvYWRbMV0pO2lmKHVybCYmdXJsLmxlbmd0aDwyMDQ4KXtmaWxlTmFtZT11cmwuc3BsaXQoXCIvXCIpLnBvcCgpLnNwbGl0KFwiP1wiKVswXSxhbmNob3IuaHJlZj11cmw7aWYoYW5jaG9yLmhyZWYuaW5kZXhPZih1cmwpIT09LTEpe3ZhciBhamF4PW5ldyBYTUxIdHRwUmVxdWVzdDtyZXR1cm4gYWpheC5vcGVuKFwiR0VUXCIsdXJsLCEwKSxhamF4LnJlc3BvbnNlVHlwZT1cImJsb2JcIixhamF4Lm9ubG9hZD1mdW5jdGlvbihlKXtkb3dubG9hZChlLnRhcmdldC5yZXNwb25zZSxmaWxlTmFtZSxkZWZhdWx0TWltZSl9LHNldFRpbWVvdXQoZnVuY3Rpb24oKXthamF4LnNlbmQoKX0sMCksYWpheH19aWYoL15kYXRhOihbXFx3Ky1dK1xcL1tcXHcrLi1dKyk/Wyw7XS8udGVzdChwYXlsb2FkKSl7aWYoIShwYXlsb2FkLmxlbmd0aD4yMDk2MTAzLjQyNCYmbXlCbG9iIT09dG9TdHJpbmcpKXJldHVybiBuYXZpZ2F0b3IubXNTYXZlQmxvYj9uYXZpZ2F0b3IubXNTYXZlQmxvYihkYXRhVXJsVG9CbG9iKHBheWxvYWQpLGZpbGVOYW1lKTpzYXZlcihwYXlsb2FkKTtwYXlsb2FkPWRhdGFVcmxUb0Jsb2IocGF5bG9hZCksbWltZVR5cGU9cGF5bG9hZC50eXBlfHxkZWZhdWx0TWltZX1lbHNlIGlmKC8oW1xceDgwLVxceGZmXSkvLnRlc3QocGF5bG9hZCkpe3ZhciBpPTAsdGVtcFVpQXJyPW5ldyBVaW50OEFycmF5KHBheWxvYWQubGVuZ3RoKSxteD10ZW1wVWlBcnIubGVuZ3RoO2ZvcihpO2k8bXg7KytpKXRlbXBVaUFycltpXT1wYXlsb2FkLmNoYXJDb2RlQXQoaSk7cGF5bG9hZD1uZXcgbXlCbG9iKFt0ZW1wVWlBcnJdLHt0eXBlOm1pbWVUeXBlfSl9YmxvYj1wYXlsb2FkIGluc3RhbmNlb2YgbXlCbG9iP3BheWxvYWQ6bmV3IG15QmxvYihbcGF5bG9hZF0se3R5cGU6bWltZVR5cGV9KTtmdW5jdGlvbiBkYXRhVXJsVG9CbG9iKHN0clVybCl7dmFyIHBhcnRzPXN0clVybC5zcGxpdCgvWzo7LF0vKSx0eXBlPXBhcnRzWzFdLGluZGV4RGVjb2Rlcj1zdHJVcmwuaW5kZXhPZihcImNoYXJzZXRcIik+MD8zOjIsZGVjb2Rlcj1wYXJ0c1tpbmRleERlY29kZXJdPT1cImJhc2U2NFwiP2F0b2I6ZGVjb2RlVVJJQ29tcG9uZW50LGJpbkRhdGE9ZGVjb2RlcihwYXJ0cy5wb3AoKSksbXg9YmluRGF0YS5sZW5ndGgsaT0wLHVpQXJyPW5ldyBVaW50OEFycmF5KG14KTtmb3IoaTtpPG14OysraSl1aUFycltpXT1iaW5EYXRhLmNoYXJDb2RlQXQoaSk7cmV0dXJuIG5ldyBteUJsb2IoW3VpQXJyXSx7dHlwZTp0eXBlfSl9ZnVuY3Rpb24gc2F2ZXIodXJsLHdpbk1vZGUpe2lmKFwiZG93bmxvYWRcImluIGFuY2hvcilyZXR1cm4gYW5jaG9yLmhyZWY9dXJsLGFuY2hvci5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLGZpbGVOYW1lKSxhbmNob3IuY2xhc3NOYW1lPVwiZG93bmxvYWQtanMtbGlua1wiLGFuY2hvci5pbm5lckhUTUw9XCJkb3dubG9hZGluZy4uLlwiLGFuY2hvci5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGFuY2hvci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpLHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsYXJndW1lbnRzLmNhbGxlZSl9KSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFuY2hvciksc2V0VGltZW91dChmdW5jdGlvbigpe2FuY2hvci5jbGljaygpLGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYW5jaG9yKSx3aW5Nb2RlPT09ITAmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLlVSTC5yZXZva2VPYmplY3RVUkwoYW5jaG9yLmhyZWYpfSwyNTApfSw2NiksITA7aWYoLyhWZXJzaW9uKVxcLyhcXGQrKVxcLihcXGQrKSg/OlxcLihcXGQrKSk/LipTYWZhcmlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpcmV0dXJuL15kYXRhOi8udGVzdCh1cmwpJiYodXJsPVwiZGF0YTpcIit1cmwucmVwbGFjZSgvXmRhdGE6KFtcXHdcXC9cXC1cXCtdKykvLGRlZmF1bHRNaW1lKSksd2luZG93Lm9wZW4odXJsKXx8Y29uZmlybShcIkRpc3BsYXlpbmcgTmV3IERvY3VtZW50XFxuXFxuVXNlIFNhdmUgQXMuLi4gdG8gZG93bmxvYWQsIHRoZW4gY2xpY2sgYmFjayB0byByZXR1cm4gdG8gdGhpcyBwYWdlLlwiKSYmKGxvY2F0aW9uLmhyZWY9dXJsKSwhMDt2YXIgZj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZiksIXdpbk1vZGUmJi9eZGF0YTovLnRlc3QodXJsKSYmKHVybD1cImRhdGE6XCIrdXJsLnJlcGxhY2UoL15kYXRhOihbXFx3XFwvXFwtXFwrXSspLyxkZWZhdWx0TWltZSkpLGYuc3JjPXVybCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmKX0sMzMzKX1pZihuYXZpZ2F0b3IubXNTYXZlQmxvYilyZXR1cm4gbmF2aWdhdG9yLm1zU2F2ZUJsb2IoYmxvYixmaWxlTmFtZSk7aWYoc2VsZi5VUkwpc2F2ZXIoc2VsZi5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpLCEwKTtlbHNle2lmKHR5cGVvZiBibG9iPT1cInN0cmluZ1wifHxibG9iLmNvbnN0cnVjdG9yPT09dG9TdHJpbmcpdHJ5e3JldHVybiBzYXZlcihcImRhdGE6XCIrbWltZVR5cGUrXCI7YmFzZTY0LFwiK3NlbGYuYnRvYShibG9iKSl9Y2F0Y2goeSl7cmV0dXJuIHNhdmVyKFwiZGF0YTpcIittaW1lVHlwZStcIixcIitlbmNvZGVVUklDb21wb25lbnQoYmxvYikpfXJlYWRlcj1uZXcgRmlsZVJlYWRlcixyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe3NhdmVyKHRoaXMucmVzdWx0KX0scmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYil9cmV0dXJuITB9fSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9kaXN0L2Rvd25sb2FkLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcclxuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHJlcGxhY2UgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xyXG5pbXBvcnQgeyBjcmVhdGVNZW1vcnlIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XHJcbmltcG9ydCB7IGNyZWF0ZVNlcnZlclJlbmRlcmVyLCBSZW5kZXJSZXN1bHQgfSBmcm9tICdhc3BuZXQtcHJlcmVuZGVyaW5nJztcclxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xyXG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAnLi9jb25maWd1cmVTdG9yZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTZXJ2ZXJSZW5kZXJlcihwYXJhbXMgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFJlbmRlclJlc3VsdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIC8vIFByZXBhcmUgUmVkdXggc3RvcmUgd2l0aCBpbi1tZW1vcnkgaGlzdG9yeSwgYW5kIGRpc3BhdGNoIGEgbmF2aWdhdGlvbiBldmVudFxyXG4gICAgICAgIC8vIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGluY29taW5nIFVSTFxyXG4gICAgICAgIGNvbnN0IGJhc2VuYW1lID0gcGFyYW1zLmJhc2VVcmwuc3Vic3RyaW5nKDAsIHBhcmFtcy5iYXNlVXJsLmxlbmd0aCAtIDEpOyAvLyBSZW1vdmUgdHJhaWxpbmcgc2xhc2hcclxuICAgICAgICBjb25zdCB1cmxBZnRlckJhc2VuYW1lID0gcGFyYW1zLnVybC5zdWJzdHJpbmcoYmFzZW5hbWUubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKGNyZWF0ZU1lbW9yeUhpc3RvcnkoKSk7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVwbGFjZSh1cmxBZnRlckJhc2VuYW1lKSk7XHJcblxyXG4gICAgICAgIC8vIFByZXBhcmUgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcGxpY2F0aW9uIGFuZCBwZXJmb3JtIGFuIGluaXRhbCByZW5kZXIgdGhhdCB3aWxsXHJcbiAgICAgICAgLy8gY2F1c2UgYW55IGFzeW5jIHRhc2tzIChlLmcuLCBkYXRhIGFjY2VzcykgdG8gYmVnaW5cclxuICAgICAgICBjb25zdCByb3V0ZXJDb250ZXh0OiBhbnkgPSB7fTtcclxuICAgICAgICBjb25zdCBhcHAgPSAoXHJcbiAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17IHN0b3JlIH0+XHJcbiAgICAgICAgICAgICAgICA8U3RhdGljUm91dGVyIGJhc2VuYW1lPXsgYmFzZW5hbWUgfSBjb250ZXh0PXsgcm91dGVyQ29udGV4dCB9IGxvY2F0aW9uPXsgcGFyYW1zLmxvY2F0aW9uLnBhdGggfSBjaGlsZHJlbj17IHJvdXRlcyB9IC8+XHJcbiAgICAgICAgICAgIDwvUHJvdmlkZXI+XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZW5kZXJUb1N0cmluZyhhcHApO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGVyZSdzIGEgcmVkaXJlY3Rpb24sIGp1c3Qgc2VuZCB0aGlzIGluZm9ybWF0aW9uIGJhY2sgdG8gdGhlIGhvc3QgYXBwbGljYXRpb25cclxuICAgICAgICBpZiAocm91dGVyQ29udGV4dC51cmwpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IHJlZGlyZWN0VXJsOiByb3V0ZXJDb250ZXh0LnVybCB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBPbmNlIGFueSBhc3luYyB0YXNrcyBhcmUgZG9uZSwgd2UgY2FuIHBlcmZvcm0gdGhlIGZpbmFsIHJlbmRlclxyXG4gICAgICAgIC8vIFdlIGFsc28gc2VuZCB0aGUgcmVkdXggc3RvcmUgc3RhdGUsIHNvIHRoZSBjbGllbnQgY2FuIGNvbnRpbnVlIGV4ZWN1dGlvbiB3aGVyZSB0aGUgc2VydmVyIGxlZnQgb2ZmXHJcbiAgICAgICAgcGFyYW1zLmRvbWFpblRhc2tzLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgIGh0bWw6IHJlbmRlclRvU3RyaW5nKGFwcCksXHJcbiAgICAgICAgICAgICAgICBnbG9iYWxzOiB7IGluaXRpYWxSZWR1eFN0YXRlOiBzdG9yZS5nZXRTdGF0ZSgpIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgcmVqZWN0KTsgLy8gQWxzbyBwcm9wYWdhdGUgYW55IGVycm9ycyBiYWNrIGludG8gdGhlIGhvc3QgYXBwbGljYXRpb25cclxuICAgIH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyLWZsdWlkIG1haW4tY29udGFpbmVyJz5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL0xheW91dC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbi8vaW1wb3J0IHsgQm9va1ByZXZpZXcgfSBmcm9tICcuL0Jvb2tQcmV2aWV3JztcclxuLy9pbXBvcnQgKiBhcyBCb29rU3RvcmUgZnJvbSAnLi4vLi4vc3RvcmUvYm9va3MnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFkZEJvb2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiB7XHJcbiAgICAvL2NvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gICAgdGhpcy5zdGF0ZVxyXG4gICAgLy99XHJcbiAgICBzZW5kQm9vaygpIHtcclxuICAgICAgICB2YXIgY3VzdG9tZXIgPSB7IGNvbnRhY3RfbmFtZTogXCJTY290dFwiLCBjb21wYW55X25hbWU6IFwiSFBcIiB9O1xyXG4gICAgICAgIHZhciBtb2RlbCA9IHtcclxuICAgICAgICAgICAgTmFtZTogXCJTaHlqdVwiLFxyXG4gICAgICAgICAgICBJZDogMTIzLFxyXG4gICAgICAgICAgICBUYWdzOiBbeyBJZDogMTIsIENvZGU6IFwiQ1wiIH0sIHsgSWQ6IDMzLCBDb2RlOiBcIlN3aWZ0XCIgfV1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZldGNoKFwiYXBpL1NhbXBsZURhdGEvQWRkQm9va1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KC8qeyBhOiAxLCBiOiAnVGV4dHVhbCBjb250ZW50JyB9Ki9tb2RlbClcclxuICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8udGhlbihmdW5jdGlvbiAoZGF0ZSkge1xyXG4gICAgICAgICAgICAvLyAgICBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAvLy50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC8vICAgIC50aGVuKHJlcyA9PiBjb25zb2xlLmxvZyhyZXMpKTtcclxuICAgIH1cclxuICAgIHVwbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9va0ltYWdlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIGJsb2JGaWxlID0gaW5wdXQhLmZpbGVzIVswXTtcclxuXHJcbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGFVUkwgPSByZWFkZXIucmVzdWx0O1xyXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215SW1nJykgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgICAgICAgICAgb3V0cHV0LnNyYyA9IGRhdGFVUkw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iRmlsZSk7XHJcbiAgICB9XHJcbiAgICB1cGxvYWRCb29rKCkge1xyXG4gICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9va0NvbnRlbnRcIikgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICB2YXIgYmxvYkZpbGUgPSBpbnB1dCEuZmlsZXMhWzBdO1xyXG5cclxuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YVVSTCA9IHJlYWRlci5yZXN1bHQ7XHJcbiAgICAgICAgICAgIC8vdmFyIG91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUltZycpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIC8vb3V0cHV0LnNyYyA9IGRhdGFVUkw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iRmlsZSk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJib29rIGlzbGFuZCBjYXJkXCI+XHJcbiAgICAgICAgICAgIDxoMSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+0JfQsNCz0YDRg9C30LrQsCDRhNCw0LnQu9CwPC9oMT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj7QndCw0LfQstCw0L3QuNC1INC60L3QuNCz0Lg8L3NwYW4+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNhcHRpb25cIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+0JjQvNGPINCQ0LLRgtC+0YDQsDwvc3Bhbj48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYXV0b3JcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+0JbQsNC90YA8L3NwYW4+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImdlbnJlXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPtCT0L7QtDwvc3Bhbj48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwieWVhclwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7QodC10YDQuNGPPC9zcGFuPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZXJpZVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7QodGC0YDQsNC90LjRhjwvc3Bhbj48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicGFnZUNvdW50XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPtCe0L/QuNGB0LDQvdC40LU8L3NwYW4+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIkRlc2NyaXB0aW9uXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPtCX0LDRgNCz0YPQt9C40YLRjDwvc3Bhbj48aW5wdXQgdHlwZT0nZmlsZScgaWQ9XCJib29rQ29udGVudFwiICBvbkNoYW5nZT17dGhpcy51cGxvYWRCb29rLmJpbmQodGhpcyl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7QmNC30L7QsdGA0LDQttC10L3QuNC1PC9zcGFuPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJEZXNjcmlwdGlvblwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7Ql9Cw0YDQs9GD0LbQtdC90L3QvtC1INCY0LfQvtCx0YDQsNC20LXQvdC40LU8L3NwYW4+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIkRlc2NyaXB0aW9uXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nZmlsZScgaWQ9XCJib29rSW1hZ2VcIiBhY2NlcHQ9J2ltYWdlLyonIG9uQ2hhbmdlPXt0aGlzLnVwbG9hZEltYWdlLmJpbmQodGhpcyl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAg0J/RgNC10LTQstCw0YDQuNGC0LXQu9GM0L3QvtC1INC40LfQvtCx0YDQsNC20LXQvdC40LUgbm8gSW1hZ2U/XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBpZD1cIm15SW1nXCIgc3JjPVwiI1wiIGFsdD1cInlvdXIgaW1hZ2VcIiBzdHlsZT17eyB3aWR0aDogXCIyMDBweFwiLCBoZWlnaHQ6IFwiMjAwcHhcIiB9fSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICDQlNCw0LvQtdC1INC/0LXRgNC10YXQvtC0INC90LAg0YTQvtGA0LzRgyDQv9GA0LXQtNC/0YDQvtGB0LzQvtGC0YDQsFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuXCIgb25DbGljaz17dGhpcy5zZW5kQm9va30+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nZ2x5cGhpY29uIGdseXBoaWNvbi1kb3dubG9hZC1hbHQnPjwvc3Bhbj4g0JfQsNCz0YDRg9C30LjRgtGMINC60L3QuNCz0YM8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL2FkbWluL0FkZEJvb2sudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb29rTGlzdCB9IGZyb20gJy4vQm9va0xpc3QnO1xyXG4vL2ltcG9ydCB7IEJvb2tQcmV2aWV3IH0gZnJvbSAnLi9Cb29rUHJldmlldyc7XHJcbi8vaW1wb3J0ICogYXMgQm9va1N0b3JlIGZyb20gJy4uLy4uL3N0b3JlL2Jvb2tzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBdXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYm9vayBpc2xhbmQgY2FyZFwiPlxyXG4gICAgICAgICAgICA8aDEgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PtCQ0LLRgtC+0YA8L2gxPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAg0KTQvtGC0L4sINCx0LjQvtCz0YDQsNGE0LjRjyDRgdC/0LjRgdC+0Log0LrQvdC40LNcclxuICAgICAgICAgICAgICAgINC00LDRgtCwINGA0L7QttC00LXQvdC40Y9cclxuICAgICAgICAgICAgICAgINC00L7QvNCw0YjQvdGP0Y8g0YHRgtGA0LDQvdC40YbQsFxyXG4gICAgICAgICAgICAgICAg0YHRgNC10LTQvdGP0Y8g0L7RhtC10L3QutCwINC60L3QuNCzXHJcbiAgICAgICAgICAgICAgICDQutC+0LvQu9C40YfQtdGB0YLQstC+INC/0YDQvtGB0LzQvtGC0YDQvtCyXHJcbiAgICAgICAgICAgICAgICA8Qm9va0xpc3QgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9hdXRvci9BdXRvci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbi8vaW1wb3J0IHsgQm9va1ByZXZpZXcgfSBmcm9tICcuL0Jvb2tQcmV2aWV3JztcclxuLy9pbXBvcnQgKiBhcyBCb29rU3RvcmUgZnJvbSAnLi4vLi4vc3RvcmUvYm9va3MnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb2tMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJib29rIGlzbGFuZCBjYXJkXCI+XHJcbiAgICAgICAgICAgIDxoMSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+0JDQstGC0L7RgDwvaDE+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICDQmtC90LjQs9CwIDEgXHJcbiAgICAgICAgICAgICAgICDQutC90LjQs9CwIDIgXHJcbiAgICAgICAgICAgICAgICDQutC90LjQs9CwIDMgXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYXV0b3IvQm9va0xpc3QudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb29rUHJldmlldyB9IGZyb20gJy4vQm9va1ByZXZpZXcnO1xyXG5pbXBvcnQgKiBhcyBCb29rU3RvcmUgZnJvbSAnLi4vLi4vc3RvcmUvYm9va3MnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Qm9va1N0b3JlLkJvb2tJbmZvLCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJib29rIGlzbGFuZCBjYXJkXCI+XHJcbiAgICAgICAgICAgIDxoMSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+e3RoaXMucHJvcHMuY2FwdGlvbn08L2gxPlxyXG4gICAgICAgICAgICA8Qm9va1ByZXZpZXcgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYm9vay9Cb29rLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBCb29rQXNzZXNzbWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7XHJcbiAgICBhdmVyYWdlOiBudW1iZXIsXHJcbiAgICBhc3Nlc3NtZW50c0NvdW50OiBudW1iZXJcclxufSwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgINCe0YbQtdC90LrQsFxyXG4gICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1zdGFyXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0gLz5cclxuICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAmbmJzcDt7dGhpcy5wcm9wcy5hdmVyYWdlfSAoe3RoaXMucHJvcHMuYXNzZXNzbWVudHNDb3VudH0pXHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL2Jvb2svQm9va0Fzc2Vzc21lbnQudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb2tEZXNjcmlwdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7XHJcbmRlc2NyaXB0aW9uOiBzdHJpbmd9LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17eyBoZWlnaHQ6IFwiMTUwcHhcIiwgb3ZlcmZsb3cgOiBcImhpZGRlblwiIH19PlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5kZXNjcmlwdGlvbn1cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYm9vay9Cb29rRGVzY3JpcHRpb24udHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gJ2RvbWFpbi10YXNrJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCb29rRG93bmxvYWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e1xyXG4gICAgYm9va0lkOiBudW1iZXIsXHJcbiAgICBib29rQ2FwdGlvbjogc3RyaW5nXHJcbn0sIHt9PiB7XHJcbiAgICBkb3dubG9hZEZpbGUoKSB7XHJcbiAgICAgICAgbGV0IGRvd25sb2FkOiBhbnkgPSByZXF1aXJlKCcuLi8uLi9kaXN0L2Rvd25sb2FkLm1pbicpO1xyXG4gICAgICAgIHZhciB0aG9zID0gdGhpcztcclxuICAgICAgICBsZXQgZmV0Y2hUYXNrID0gZmV0Y2goYGFwaS9TYW1wbGVEYXRhL0dldEJvb2tUZXh0QnlJRD9ib29rSWQ9JHt0aGlzLnByb3BzLmJvb2tJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3AuYmxvYigpO1xyXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChibG9iKSB7XHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZChibG9iLCB0aG9zLnByb3BzLmJvb2tDYXB0aW9uICsgXCIudHh0XCIsIFwidGV4dC9wbGFpblwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBncm91cE5hbWUgPSBcImRvd25sb2FkRm9ybWF0XCIgKyB0aGlzLnByb3BzLmJvb2tJZDtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgINCk0L7RgNC80LDRglxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImlubGluZVwiIH19PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHN0eWxlPXt7IGRpc3BsYXk6IFwiaW5saW5lXCIgfX0gY2xhc3NOYW1lPVwiXCIgdHlwZT1cInJhZGlvXCIgbmFtZT17Z3JvdXBOYW1lfSBpZD1cImZiMklkXCIgdmFsdWU9XCJmYjJcIiBkZWZhdWx0Q2hlY2tlZCAvPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImxhYmVsIGxhYmVsLWRlZmF1bHRcIiBodG1sRm9yPVwiZmIySWRcIj5mYjI8L2xhYmVsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImlubGluZVwiLCBwYWRkaW5nTGVmdDogXCIxMHB4XCIgfX0+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3sgZGlzcGxheTogXCJpbmxpbmVcIiB9fSBjbGFzc05hbWU9XCJyYWRpb1wiIHR5cGU9XCJyYWRpb1wiIG5hbWU9e2dyb3VwTmFtZX0gaWQ9XCJlcHViSWRcIiB2YWx1ZT1cImVwdWJcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImxhYmVsIGxhYmVsLWRlZmF1bHRcIiBodG1sRm9yPVwiZXB1YklkXCI+ZXB1YjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG5cIiBvbkNsaWNrPXt0aGlzLmRvd25sb2FkRmlsZS5iaW5kKHRoaXMpfT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2dseXBoaWNvbiBnbHlwaGljb24tZG93bmxvYWQtYWx0Jz48L3NwYW4+INCh0LrQsNGH0LDRgtGMPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL2Jvb2svQm9va0Rvd25sb2FkLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTGluaywgTmF2TGluaywgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgKiBhcyBCb29rU3RvcmUgZnJvbSAnLi4vLi4vc3RvcmUvYm9va3MnO1xyXG5pbXBvcnQgeyBQcmV2aWV3RGVzY3JpcHRpb24gfSBmcm9tICcuL1ByZXZpZXdEZXNjcmlwdGlvbic7XHJcbmltcG9ydCB7IEJvb2tEb3dubG9hZCB9IGZyb20gJy4vQm9va0Rvd25sb2FkJztcclxuaW1wb3J0IHsgQm9va0Rlc2NyaXB0aW9uIH0gZnJvbSAnLi9Cb29rRGVzY3JpcHRpb24nO1xyXG5pbXBvcnQgeyBCb29rUHJldmlld0NvbW1lbnRzQ291bnRlciB9IGZyb20gJy4vQm9va1ByZXZpZXdDb21tZW50c0NvdW50ZXInO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBCb29rUHJldmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxCb29rU3RvcmUuQm9va0luZm8sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8dGFibGUgc3R5bGU9e3sgd2lkdGg6IFwiMTAwJVwiIH19PlxyXG4gICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiBcIjI2MHB4XCIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17dGhpcy5wcm9wcy5pbWFnZVVybH0gYWx0PVwiYm9va1BpY3R1cmVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvb2tQcmV2aWV3RGVzY3JpcHRpb25Db250YWluZXJcIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByZXZpZXdEZXNjcmlwdGlvbiB7Li4udGhpcy5wcm9wc30gLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmV2aWV3R3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3MgXCIgc3R5bGU9e3sgd2lkdGg6IFwiMTUwcHhcIiB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIHRvPXtgL2Jvb2tDb250ZW50LyR7dGhpcy5wcm9wcy5ib29rSWR9YH0gYWN0aXZlQ2xhc3NOYW1lPSdhY3RpdmUnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nZ2x5cGhpY29uIGdseXBoaWNvbi1ib29rJz48L3NwYW4+INCn0LjRgtCw0YLRjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZMaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZXZpZXdHcm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9va1ByZXZpZXdDb21tZW50c0NvdW50ZXIgY29tbWVudENvdW50PXt0aGlzLnByb3BzLmNvbW1lbnRDb3VudH0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZXZpZXdHcm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9va0Rvd25sb2FkIGJvb2tJZD17dGhpcy5wcm9wcy5ib29rSWR9IGJvb2tDYXB0aW9uPXt0aGlzLnByb3BzLmNhcHRpb259IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmV2aWV3R3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb2tEZXNjcmlwdGlvbiBkZXNjcmlwdGlvbj17dGhpcy5wcm9wcy5kZXNjcmlwdGlvbn0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL2Jvb2svQm9va1ByZXZpZXcudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb2tQcmV2aWV3Q29tbWVudHNDb3VudGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtcclxuICAgIGNvbW1lbnRDb3VudDogbnVtYmVyO1xyXG59LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAg0JrQvtC80LzQtdC90YLQsNGA0LjQuCAoe3RoaXMucHJvcHMuY29tbWVudENvdW50fSlcclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYm9vay9Cb29rUHJldmlld0NvbW1lbnRzQ291bnRlci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJvb2tBc3Nlc3NtZW50IH0gZnJvbSAnLi9Cb29rQXNzZXNzbWVudCc7XHJcbmltcG9ydCAqIGFzIEJvb2tTdG9yZSBmcm9tICcuLi8uLi9zdG9yZS9ib29rcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJldmlld0Rlc2NyaXB0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PEJvb2tTdG9yZS5Cb29rSW5mbywge30+IHtcclxuICAgIHJlbmRlckJvb2tBc3Nlc3NtZW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFzc2Vzc21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxCb29rQXNzZXNzbWVudCBhdmVyYWdlPXt0aGlzLnByb3BzLmFzc2Vzc21lbnQuYXZlcmFnZX0gYXNzZXNzbWVudHNDb3VudD17dGhpcy5wcm9wcy5hc3Nlc3NtZW50LmFzc2Vzc21lbnRzQ291bnR9IC8+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicHJldmlld0dyb3VwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiBcInJpZ2h0XCIgfX0+XHJcbiAgICAgICAgICAgICAgICDQlNCw0YLQsCDQtNC+0LHQsNCy0LvQtdC90LjRjzoge25ldyBEYXRlKHRoaXMucHJvcHMudXBsb2FkRGF0ZSkudG9Mb2NhbGVEYXRlU3RyaW5nKFwicnUtUlVcIiwgb3B0aW9ucyl9ICZuYnNwO1xyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJvb2tBc3Nlc3NtZW50KCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2Rlc2MxJz4g0JDQstGC0L7RgDo8L3NwYW4+IHt0aGlzLnByb3BzLmF1dG9yfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nZGVzYzEnPiDQltCw0L3RgDo8L3NwYW4+IHt0aGlzLnByb3BzLmdlbnJlLmpvaW4oXCIsIFwiKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2Rlc2MxJz4g0KHQtdGA0LjRjzo8L3NwYW4+IHt0aGlzLnByb3BzLnNlcmllc31cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2Rlc2MxJz4g0K/Qt9GL0Log0LrQvdC40LPQuDo8L3NwYW4+IHt0aGlzLnByb3BzLmxhbmd1YWdlfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nZGVzYzEnPiDQodGC0YDQsNC90LjRhjo8L3NwYW4+IHt0aGlzLnByb3BzLnBhZ2VDb3VudH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYm9vay9QcmV2aWV3RGVzY3JpcHRpb24udHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IEJvb2sgfSBmcm9tICcuLi9ib29rL0Jvb2snO1xyXG5pbXBvcnQgeyBCb29rc0xpc3RTb3J0ZXIgfSBmcm9tICcuL0Jvb2tzTGlzdFNvcnRlcic7XHJcbmltcG9ydCAqIGFzIEJvb2tzU3RvcmUgZnJvbSAnLi4vLi4vc3RvcmUvQm9va3MnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb2tzTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7XHJcbiAgICBib29rczogQm9va3NTdG9yZS5Cb29rSW5mb1tdLFxyXG4gICAgc29ydEJvb2tzOiB0eXBlb2YgQm9va3NTdG9yZS5hY3Rpb25DcmVhdG9ycy5zb3J0Qm9va3NcclxufSwge30+IHtcclxuICAgIHByaXZhdGUgcmVuZGVyQm9va3MoKSB7XHJcbiAgICAgICAgbGV0IHJlc0FycjogYW55ID0gW107XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmJvb2tzKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzQXJyO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5ib29rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYm9vayA9IHRoaXMucHJvcHMuYm9va3NbaV07XHJcbiAgICAgICAgICAgIHJlc0Fyci5wdXNoKDxCb29rIGtleT17aX0gaW1hZ2VVcmw9e2Jvb2suaW1hZ2VVcmx9IGF1dG9yPXtib29rLmF1dG9yLnRvU3RyaW5nKCl9IGNhcHRpb249e2Jvb2suY2FwdGlvbn0gc2VyaWVzPXtib29rLnNlcmllc31cclxuICAgICAgICAgICAgICAgIGJvb2tJZD17Ym9vay5ib29rSWR9IGRlc2NyaXB0aW9uPXtib29rLmRlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgICAgYXNzZXNzbWVudD17Ym9vay5hc3Nlc3NtZW50fSBnZW5yZT17Ym9vay5nZW5yZX0gbGFuZ3VhZ2U9e2Jvb2subGFuZ3VhZ2V9IHBhZ2VDb3VudD17Ym9vay5wYWdlQ291bnR9XHJcbiAgICAgICAgICAgICAgICB1cGxvYWREYXRlPXtib29rLnVwbG9hZERhdGV9IGNvbW1lbnRDb3VudD17Ym9vay5jb21tZW50Q291bnR9IC8+KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc0FycjtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgaXNsYW5kJz5cclxuICAgICAgICAgICAgICAgIDxCb29rc0xpc3RTb3J0ZXIgc29ydEJvb2tzPXt0aGlzLnByb3BzLnNvcnRCb29rc30gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHt0aGlzLnJlbmRlckJvb2tzKCl9XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYm9va3NMaXN0L0Jvb2tzTGlzdC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9va3NMaXN0U29ydEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7XHJcbiAgICBzb3J0VHlwZUNhcHRpb246IHN0cmluZyxcclxuICAgIG9uQnV0dG9uQ2xpY2s6IGFueSxcclxuICAgIGlzQWN0aXZlOiBib29sZWFuXHJcbn0sIHt9PiB7XHJcbiAgICBnZXRCdXR0b25DbGFzc05hbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFwiYnRuIGRyb3Bkb3duLXRvZ2dsZSBcIiArICh0aGlzLnByb3BzLmlzQWN0aXZlID8gXCJidG4tcHJpbWFyeVwiIDogXCJidG4tZGVmYXVsdFwiKTtcclxuICAgIH1cclxuICAgIHJlbmRlckJ1dHRvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnV0dG9uQ2xpY2t9IGNsYXNzTmFtZT17dGhpcy5nZXRCdXR0b25DbGFzc05hbWUoKX0gdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGlkPXtcImRyb3Bkb3duTWVudVwiICsgdGhpcy5wcm9wcy5zb3J0VHlwZUNhcHRpb259IGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnNvcnRUeXBlQ2FwdGlvbn1cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic29ydEJ0blwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duXCIgc3R5bGU9e3sgZGlzcGxheTogXCJpbmxpbmVcIiB9fT5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJ1dHRvbigpfVxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgICAgICAvLzx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PXtcImRyb3Bkb3duTWVudVwiICsgdGhpcy5wcm9wcy5zb3J0VHlwZUNhcHRpb259PlxyXG4gICAgICAgICAgICAgICAgLy8gICAgPGxpPjxhIGhyZWY9XCIjXCI+0L3QtdC00LXQu9GPPC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAvLyAgICA8bGk+PGEgaHJlZj1cIiNcIj7QvNC10YHRj9GGPC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAvLyAgICA8bGk+PGEgaHJlZj1cIiNcIj7Qs9C+0LQ8L2E+PC9saT5cclxuICAgICAgICAgICAgICAgIC8vICAgIDxsaT48YSBocmVmPVwiI1wiPtCy0YHQtSDQstGA0LXQvNGPPC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAvLzwvdWw+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvYm9va3NMaXN0L0Jvb2tzTGlzdFNvcnRCdXR0b24udHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb29rc0xpc3RTb3J0QnV0dG9uIH0gZnJvbSAnLi9Cb29rc0xpc3RTb3J0QnV0dG9uJztcclxuaW1wb3J0ICogYXMgQm9va3NTdG9yZSBmcm9tICcuLi8uLi9zdG9yZS9Cb29rcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9va3NMaXN0U29ydGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtcclxuICAgIHNvcnRCb29rczogdHlwZW9mIEJvb2tzU3RvcmUuYWN0aW9uQ3JlYXRvcnMuc29ydEJvb2tzXHJcbn0sIHtcclxuICAgICAgICBzb3J0VHlwZTogQm9va3NTdG9yZS5Cb29rc1NvcnRUeXBlXHJcbiAgICB9PiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzb3J0VHlwZTogQm9va3NTdG9yZS5Cb29rc1NvcnRUeXBlLkRhdGVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRTb3J0VHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgeyBuYW1lOiBCb29rc1N0b3JlLkJvb2tzU29ydFR5cGUuRGF0ZSwgY2FwdGlvbjogXCLQlNCw0YLQsFwiIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogQm9va3NTdG9yZS5Cb29rc1NvcnRUeXBlLlJhaXRpbmcsIGNhcHRpb246IFwi0KDQtdC50YLQuNC90LNcIiB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IEJvb2tzU3RvcmUuQm9va3NTb3J0VHlwZS5WaWV3cywgY2FwdGlvbjogXCLQn9GA0L7RgdC80L7RgtGA0YtcIiB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IEJvb2tzU3RvcmUuQm9va3NTb3J0VHlwZS5Db21tZW50cywgY2FwdGlvbjogXCLQmtC+0LzQvNC10L3RgtCw0YDQuNC4XCIgfVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBvbkJ1dHRvbkNsaWNrKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc29ydFR5cGU6IHZhbHVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5zb3J0Qm9va3ModmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZW5kZXJCdXR0b25zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNvcnRUeXBlcygpLm1hcCgoYnRuLCBpbmRleCkgPT5cclxuICAgICAgICAgICAgPEJvb2tzTGlzdFNvcnRCdXR0b24ga2V5PXtpbmRleH0gc29ydFR5cGVDYXB0aW9uPXtidG4uY2FwdGlvbn0gb25CdXR0b25DbGljaz17dGhpcy5vbkJ1dHRvbkNsaWNrLmJpbmQodGhpcywgYnRuLm5hbWUpfSBpc0FjdGl2ZT17dGhpcy5zdGF0ZS5zb3J0VHlwZSA9PT0gYnRuLm5hbWV9IC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYm9va3NDb250YWluZXJTb3J0ZXJcIj5cclxuICAgICAgICAgICAgPGRpdj7Qv9C70LjRgtC60LAv0YHQv9C40YHQvtC6PC9kaXY+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNvcnRDYXB0aW9uXCI+0KHQvtGA0YLQuNGA0L7QstCw0YLRjCDQv9C+Ojwvc3Bhbj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzb3J0QnRuc1wiPlxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQnV0dG9ucygpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9ib29rc0xpc3QvQm9va3NMaXN0U29ydGVyLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxJdGVtIH0gZnJvbSAnLi9DYXJvdXNlbGl0ZW0nO1xyXG5pbXBvcnQgKiBhcyBCb29rc1N0b3JlIGZyb20gJy4uLy4uL3N0b3JlL0Jvb2tzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCb29rQ2Fyb3VzZWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e1xyXG4gICAgYm9va3M6IEJvb2tzU3RvcmUuQm9va0luZm9bXSxcclxufSwgeyBzdGFydEluZGV4OiBudW1iZXIgfT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzdGFydEluZGV4OiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlckl0ZW1zKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYm9vayA9IHRoaXMucHJvcHMuYm9va3NbaV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKDxDYXJvdXNlbEl0ZW0ga2V5PXtpfSBpbWFnZVNyYz17Ym9vayA/IGJvb2suaW1hZ2VVcmwgOiBcIlwifSAvPik7Ly9UT0RPXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2ID5cclxuICAgICAgICAgICAgPGRpdj4g0JHQtdGB0YLRhtC10LvQu9C10YDRiyDQvNC10YHRj9GG0LA6IDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcm91c2VsXCIgc3R5bGU9e3sgd2lkdGg6IFwiMTAwJVwiIH19PlxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG4gICAgLy8gICAgICAgPGEgY2xhc3NOYW1lPVwibGVmdCBjYXJvdXNlbC1jb250cm9sXCIgaHJlZj1cIiNteUNhcm91c2VsXCIgcm9sZT1cImJ1dHRvblwiIGRhdGEtc2xpZGU9XCJwcmV2XCJcclxuICAgIC8vICAgIG9uQ2xpY2s9e3RoaXMubW92ZVByZXZJdGVtcy5iaW5kKHRoaXMpfT5cclxuICAgIC8vICAgIDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1sZWZ0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgLy8gICAgPHNwYW4gY2xhc3NOYW1lPVwic3Itb25seVwiPlByZXZpb3VzPC9zcGFuPlxyXG4gICAgLy88L2E+XHJcbiAgICAvLyAgICA8YSBjbGFzc05hbWU9XCJyaWdodCBjYXJvdXNlbC1jb250cm9sXCIgaHJlZj1cIiNteUNhcm91c2VsXCIgcm9sZT1cImJ1dHRvblwiIGRhdGEtc2xpZGU9XCJuZXh0XCJcclxuICAgIC8vICAgICAgICBvbkNsaWNrPXt0aGlzLm1vdmVOZXh0SXRlbXN9PlxyXG4gICAgLy8gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1yaWdodFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgIC8vICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+TmV4dDwvc3Bhbj5cclxuICAgIC8vICAgIDwvYT5cclxuICAgIC8vbW92ZU5leHRJdGVtcyA9ICgpID0+IHtcclxuICAgIC8vICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgLy8gICAgICAgIHN0YXJ0SW5kZXg6IHRoaXMuc3RhdGUuc3RhcnRJbmRleCArIDdcclxuICAgIC8vICAgIH0pO1xyXG4gICAgLy99XHJcbiAgICAvL21vdmVQcmV2SXRlbXMoKSB7XHJcbiAgICAvLyAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgIC8vICAgICAgICBzdGFydEluZGV4OiB0aGlzLnN0YXRlLnN0YXJ0SW5kZXggLSA3XHJcbiAgICAvLyAgICB9KTtcclxuICAgIC8vfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL2Nhcm91c2VsL0Jvb2tDYXJvdXNlbC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtcclxuICAgIGltYWdlU3JjOiBzdHJpbmdcclxufSwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY2Fyb3VzZWxJdGVtXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPXt0aGlzLnByb3BzLmltYWdlU3JjfSBhbHQ9XCJib29rUGljdHVyZVwiIHdpZHRoPXsxMDV9IGhlaWdodD17MTY1fSAvPlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9jYXJvdXNlbC9DYXJvdXNlbGl0ZW0udHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2TWVudUl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e1xyXG4gICAgY2FwdGlvbjogc3RyaW5nLFxyXG4gICAgdXJsOiBzdHJpbmdcclxufSwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxOYXZMaW5rIHRvPXt0aGlzLnByb3BzLnVybH0gYWN0aXZlQ2xhc3NOYW1lPSdhY3RpdmUnPlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5jYXB0aW9ufVxyXG4gICAgICAgIDwvTmF2TGluaz5cclxuICAgIH1cclxufSAgICAgICAgICAgIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL25hdk1lbnUvTmF2TWVudUl0ZW0udHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBDYXB0aW9uSW5wdXQgfSBmcm9tICcuL0NhcHRpb25JbnB1dCc7XHJcbmltcG9ydCB7IENvbXBsZXRlbmVzc0lucHV0IH0gZnJvbSAnLi9Db21wbGV0ZW5lc3NJbnB1dCc7XHJcbmltcG9ydCB7IEdlbnJlc0lucHV0IH0gZnJvbSAnLi9HZW5yZXNJbnB1dCc7XHJcbmltcG9ydCB7IEhpZGVSZWFkZWRCb29rSW5wdXQgfSBmcm9tICcuL0hpZGVSZWFkZWRCb29rSW5wdXQnO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUlucHV0IH0gZnJvbSAnLi9MYW5ndWFnZUlucHV0JztcclxuaW1wb3J0IHsgUGFnZVNpemVJbnB1dCB9IGZyb20gJy4vUGFnZVNpemVJbnB1dCc7XHJcbmltcG9ydCB7IFllYXJJbnB1dCB9IGZyb20gJy4vWWVhcklucHV0JztcclxuXHJcbnR5cGUgQm9va3NTZWFyY2hTdGF0ZSA9IHtcclxuICAgIGNhcHRpb25BdXRvcj86IHN0cmluZyxcclxuICAgIGdlbnJlPzogc3RyaW5nLFxyXG4gICAgbGFuZ3VhZ2U/OiBzdHJpbmcsXHJcbiAgICBtaW5QYWdlQ291bnQ/OiBudW1iZXIsXHJcbiAgICBtYXhQYWdlQ291bnQ/OiBudW1iZXIsXHJcbiAgICBtaW5ZZWFyPzogbnVtYmVyLFxyXG4gICAgbWF4WWVhcj86IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQm9va3NTZWFyY2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e1xyXG4gICAgcmVxdWVzdEJvb2tzOiBhbnlcclxufSwgQm9va3NTZWFyY2hTdGF0ZT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBjYXB0aW9uQXV0b3I6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZ2VucmU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgbWluUGFnZUNvdW50OiAwLCAvL3VuZGVmaW5lZFxyXG4gICAgICAgICAgICBtYXhQYWdlQ291bnQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgbWluWWVhcjogMCwvL3VuZGVmaW5lZFxyXG4gICAgICAgICAgICBtYXhZZWFyOiB1bmRlZmluZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmaWx0ZXJCb29rcyA9IChuZXdTdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5yZXF1ZXN0Qm9va3MoSlNPTi5zdHJpbmdpZnkobmV3U3RhdGUgfHwgdGhpcy5zdGF0ZSkpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlRmlsdGVyKGV2dDogYW55KSB7XHJcbiAgICAgICAgZGVidWdnZXJcclxuICAgICAgICBsZXQgbmV3U3RhdGU6IGFueSA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24obmV3U3RhdGUsIHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIG5ld1N0YXRlW2V2dC50YXJnZXQubmFtZV0gPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHM6IGFueSwgbmV4dFN0YXRlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmZpbHRlckJvb2tzKG5leHRTdGF0ZSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVGaWx0ZXJCeUVudGVyS2V5UHJlc3MoZXZ0OiBhbnkpIHtcclxuICAgICAgICBpZiAoZXZ0LmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcihldnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8aDM+0J/QvtC40YHQuiDQutC90LjQszwvaDM+XHJcbiAgICAgICAgICAgICAgICA8Q2FwdGlvbklucHV0IHVwZGF0ZUZpbHRlcj17dGhpcy51cGRhdGVGaWx0ZXIuYmluZCh0aGlzKX0gLz5cclxuICAgICAgICAgICAgICAgIDxHZW5yZXNJbnB1dCB1cGRhdGVGaWx0ZXI9e3RoaXMudXBkYXRlRmlsdGVyLmJpbmQodGhpcyl9IC8+XHJcbiAgICAgICAgICAgICAgICA8TGFuZ3VhZ2VJbnB1dCB1cGRhdGVGaWx0ZXI9e3RoaXMudXBkYXRlRmlsdGVyLmJpbmQodGhpcyl9IC8+XHJcbiAgICAgICAgICAgICAgICA8WWVhcklucHV0IHVwZGF0ZUZpbHRlcj17dGhpcy51cGRhdGVGaWx0ZXIuYmluZCh0aGlzKX0gLz5cclxuICAgICAgICAgICAgICAgIDxQYWdlU2l6ZUlucHV0IHVwZGF0ZUZpbHRlcj17dGhpcy51cGRhdGVGaWx0ZXIuYmluZCh0aGlzKX0gLz5cclxuICAgICAgICAgICAgICAgIDxDb21wbGV0ZW5lc3NJbnB1dCB1cGRhdGVGaWx0ZXI9e3RoaXMudXBkYXRlRmlsdGVyLmJpbmQodGhpcyl9IC8+XHJcbiAgICAgICAgICAgICAgICA8SGlkZVJlYWRlZEJvb2tJbnB1dCB1cGRhdGVGaWx0ZXI9e3RoaXMudXBkYXRlRmlsdGVyLmJpbmQodGhpcyl9IC8+XHJcbiAgICAgICAgICAgICAgICDQmtC+0LvQu9C40YfQtdGB0YLQstC+INC60L7QvNC80LXQvdGC0LDRgNC40LXQsiBcclxuICAgICAgICAgICAgICAgINC60L7Qu9C70LjRh9C10YHRgtCy0L4g0L/RgNC+0YHQvNC+0YLRgNC+0LJcclxuICAgICAgICAgICAgICAgINGF0L7RgNC+0YjQsNGPINC/0YDQuNC00YPQvNC60LAg0LTQstGD0YXRg9GA0L7QstC90LXQstCw0Y8g0L7QsdC10YDRgtC60LAg0L7QsdC+0LvQttC60LhcclxuICAgICAgICAgICAgICAgINGB0L7RgdGC0L7Rj9C90LjQtSDQutC90LjQs9C4INC30LDQutC+0L3Rh9C10L3QsCDQv9C40YjQtdGC0YHRjyDQstGL0LvQvtC20LXQvdCwINC90LXQv9C+0LvQvdC+0YHRgtGM0Y5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59ICAgICAgICAgIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL3NlYXJjaC9Cb29rc1NlYXJjaC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FwdGlvbklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtcclxuICAgIHVwZGF0ZUZpbHRlcjogYW55XHJcbn0sIHt9PiB7XHJcbiAgICBoYW5kbGVLZXlQcmVzcyhldnQ6IGFueSkge1xyXG4gICAgICAgIGlmIChldnQua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXBkYXRlRmlsdGVyKGV2dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtaXRlbVwiPlxyXG4gICAgICAgICAgICA8c3Bhbj7QndCw0LfQstCw0L3QuNC1INC60L3QuNCz0Lgg0LjQu9C4INCw0LLRgtC+0YA8L3NwYW4+PGlucHV0IG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlQcmVzcy5iaW5kKHRoaXMpfSB0eXBlPVwidGV4dFwiIG5hbWU9XCJjYXB0aW9uQXV0b3JcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL3NlYXJjaC9DYXB0aW9uSW5wdXQudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBsZXRlbmVzc0lucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtcclxuICAgIHVwZGF0ZUZpbHRlcjogYW55XHJcbn0sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1pdGVtXCI+XHJcbiAgICAgICAgICAgIDxkaXY+0JfQsNC60L7QvdGH0LXQvdC90L7RgdGC0Yw8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9wZG93biBtZW51LWp1c3RpZnlcIiA+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJkcm9wZG93bk1lbnUxXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRyb3Bkb3duQ2FwdGlvblwiPtCX0LDQutC+0L3Rh9C10L08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2FyZXRcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IFwiIGFyaWEtbGFiZWxsZWRieT1cImRyb3Bkb3duTWVudTFcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj7Ql9Cw0LrQvtC90YfQtdC9PC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+0J/QuNGI0LXRgtGB0Y88L2E+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj7Ql9Cw0LzQvtGA0L7QttC10L08L2E+PC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJjb21wbGV0ZW5lc3NcIiAvPlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9zZWFyY2gvQ29tcGxldGVuZXNzSW5wdXQudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBHZW5yZXNMaXN0IH0gZnJvbSAnLi9HZW5yZXNMaXN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBHZW5yZXNJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7XHJcbiAgICB1cGRhdGVGaWx0ZXI6IGFueVxyXG59LCB7fT4ge1xyXG4gICAgdXBkYXRlSW5wdXQoZXZ0OiBhbnkpIHtcclxuICAgICAgICBkZWJ1Z2dlclxyXG4gICAgICAgICh0aGlzLnJlZnMuZ2VucmUgYXMgSFRNTEVsZW1lbnQpLmlubmVySFRNTCA9IGV2dC50YXJnZXQuaW5uZXJUZXh0O1xyXG4gICAgfVxyXG4gICAgb25DaGFuZ2UoZXZ0OiBhbnkpIHtcclxuICAgICAgICAvL3RoaXMucHJvcHMudXBkYXRlRmlsdGVyXHJcbiAgICAgICAgLy9kZWJ1Z2dlcmFzZHNkXHJcbiAgICAgICAgLy8odGhpcy5yZWZzLmdlbnJlIGFzIEhUTUxFbGVtZW50KS5pbm5lckhUTUwgPSBldnQudGFyZ2V0LmlubmVyVGV4dDtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWl0ZW1cIiA+XHJcblxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLWxnIFwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNteU1vZGFsXCI+XHJcbiAgICAgICAgICAgICAgICDQltCw0L3RgNGLXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9XCJteU1vZGFsXCIgdGFiSW5kZXg9ey0xfSByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwibXlNb2RhbExhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIiBpZD1cIm15TW9kYWxMYWJlbFwiPtCW0LDQvdGA0Ys8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8R2VucmVzTGlzdCAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPlNhdmUgY2hhbmdlczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICAgICAgLy9yZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtaXRlbVwiID5cclxuICAgICAgICAvLyAgICA8ZGl2PtCW0LDQvdGA0Ys8L2Rpdj5cclxuICAgICAgICAvLyAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duIG1lbnUtanVzdGlmeVwiID5cclxuICAgICAgICAvLyAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIGlkPVwiZHJvcGRvd25NZW51X2dlbnJlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXHJcbiAgICAgICAgLy8gICAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJ0cnVlXCI+XHJcbiAgICAgICAgLy8gICAgICAgICAgICA8aW5wdXQgcmVmPVwiZ2VucmVcIiB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImdlbnJlXCIgaWQ9XCJnYW5yZXNWYWx1ZVwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLnVwZGF0ZUZpbHRlcn0gLz5cclxuICAgICAgICAvLyAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRyb3Bkb3duQ2FwdGlvblwiPtCW0LDQvdGA0Ys8L3NwYW4+XHJcbiAgICAgICAgLy8gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiPjwvc3Bhbj5cclxuICAgICAgICAvLyAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgLy8gICAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZHJvcGRvd25NZW51X2dlbnJlXCIgaWQ9XCJnYW5yZXNsaXN0XCIgb25DbGljaz17dGhpcy51cGRhdGVJbnB1dC5iaW5kKHRoaXMpfSA+XHJcbiAgICAgICAgLy8gICAgICAgICAgICA8bGk+PGE+0JTRgNCw0LzQsDwvYT48L2xpPlxyXG4gICAgICAgIC8vICAgICAgICAgICAgPGxpPjxhPtCR0L7QtdCy0LjQutC4PC9hPjwvbGk+XHJcbiAgICAgICAgLy8gICAgICAgICAgICA8bGk+PGE+0KDQvtC80LDQvTwvYT48L2xpPlxyXG4gICAgICAgIC8vICAgICAgICAgICAgPGxpPjxhPtCk0LDQvdGC0LDRgdGC0LjQutCwPC9hPjwvbGk+XHJcbiAgICAgICAgLy8gICAgICAgIDwvdWw+XHJcbiAgICAgICAgLy8gICAgPC9kaXY+XHJcbiAgICAgICAgLy88L2Rpdj47XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9zZWFyY2gvR2VucmVzSW5wdXQudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5leHBvcnQgY2xhc3MgR2VucmVzTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IHtcclxuICAgIHB1YmxpYyBnZXRHZW5yZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXCLQpNCw0L3RgtCw0YHRgtC40LrQsCDQuCDQpNGN0L3RgtC10LfQuFwiLCBcItCU0LXRgtC10LrRgtC40LLRiyDQuCDQotGA0LjQu9C70LXRgNGLXCIsIFwi0J/QvtGN0LfQuNGPINC4INC00YDQsNC80LDRgtGD0YDQs9C40Y9cIiwgXCLQrtC80L7RgFwiLCBcItCh0YLQsNGA0LjQvdC90LDRjyDQu9C40YLQtdGA0LDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICBcItCU0L7QvCDQuCDQodC10LzRjNGPXCIsIFwi0J3QsNGD0YfQvdC+LdC+0LHRgNCw0LfQvtCy0LDRgtC10LvRjNC90LDRj1wiLCBcItCU0LXQu9C+0LLQsNGPINC70LjRgtC10YDQsNGC0YPRgNCwXCIsIFwi0J/RgNC+0LfQsFwiLCBcItCa0L7QvNC/0YzRjtGC0LXRgNGLINC4INCY0L3RgtC10YDQvdC10YJcIiwgXCLQn9GA0L7Rh9C10LVcIiwgXCLQlNGA0LDQvNCw0YLRg9GA0LPQuNGPXCJdO1xyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVuZGVySXRlbXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0R2VucmVzKCkubWFwKChnZW5yZSwgaW5kZXgpID0+IDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTZcIj5cclxuICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGFyaWEtbGFiZWw9XCIuLi5cIiAvPlxyXG4gICAgICAgICAgICAgICAge2dlbnJlfVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBhcmlhLWxhYmVsPVwiLi4uXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL3NlYXJjaC9HZW5yZXNMaXN0LnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBIaWRlUmVhZGVkQm9va0lucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtcclxuICAgIHVwZGF0ZUZpbHRlcjogYW55XHJcbn0sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8bGFiZWwgY2xhc3NOYW1lPVwic2VhcmNoLWl0ZW1cIj5cclxuICAgICAgICAgICAgPHNwYW4+0KHQutGA0YvRgtGMINC/0YDQvtGH0LjRgtCw0L3QvdGL0LUg0LrQvdC40LPQuCA8L3NwYW4+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWlubGluZVwiIC8+XHJcbiAgICAgICAgPC9sYWJlbD47XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9zZWFyY2gvSGlkZVJlYWRlZEJvb2tJbnB1dC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7XHJcbiAgICB1cGRhdGVGaWx0ZXI6IGFueVxyXG59LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtaXRlbVwiPlxyXG4gICAgICAgICAgICA8ZGl2PtCv0LfRi9C6PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd24gbWVudS1qdXN0aWZ5XCIgPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIGlkPVwiZHJvcGRvd25NZW51X2xhbmd1YWdlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRyb3Bkb3duQ2FwdGlvblwiPtCv0LfRi9C6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhcmV0XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBcIiBhcmlhLWxhYmVsbGVkYnk9XCJkcm9wZG93bk1lbnVfbGFuZ3VhZ2VcIiBvbkNsaWNrPXt0aGlzLnByb3BzLnVwZGF0ZUZpbHRlcn0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+0KDRg9GB0YHQutC40Lk8L2E+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj7QkNC90LPQu9C40LnRgdC60LjQuTwvYT48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPtCd0LXQvNC10YbQutC40Lk8L2E+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzTmFtZT1cImRpdmlkZXJcIj48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPtCk0YDQsNC90YbRg9C30YHQutC40Lk8L2E+PC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJsYW5ndWFnZVwiIC8+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvc2VhcmNoL0xhbmd1YWdlSW5wdXQudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VTaXplSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e1xyXG4gICAgdXBkYXRlRmlsdGVyOiBhbnlcclxufSwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWl0ZW1cIj5cclxuICAgICAgICAgICAgPGRpdj7QmtC+0LvQu9C40YfQtdGB0YLQstC+INGB0YLRgNCw0L3QuNGGOiA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17dGhpcy5wcm9wcy51cGRhdGVGaWx0ZXJ9IG5hbWU9XCJtaW5ZZWFyXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMVwiPtGB0YLRgC48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMudXBkYXRlRmlsdGVyfSBuYW1lPVwibWluWWVhclwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTFcIj7RgdGC0YAuPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL3NlYXJjaC9QYWdlU2l6ZUlucHV0LnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBZZWFySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e1xyXG4gICAgdXBkYXRlRmlsdGVyOiBhbnlcclxufSwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWl0ZW1cIj5cclxuICAgICAgICAgICAgPGRpdj7Qk9C+0LQ6PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMudXBkYXRlRmlsdGVyfSBuYW1lPVwibWluWWVhclwiLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMVwiPiDQsy48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17dGhpcy5wcm9wcy51cGRhdGVGaWx0ZXJ9IG5hbWU9XCJtYXhZZWFyXCIvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xXCI+INCzLjwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvc2VhcmNoL1llYXJJbnB1dC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYnMgfSBmcm9tICcuLi9jb21wb25lbnRzL0JyZWFkY3J1bWJzJztcclxuaW1wb3J0IHsgQm9va3NMaXN0IH0gZnJvbSAnLi4vY29tcG9uZW50cy9ib29rc0xpc3QvQm9va3NMaXN0JztcclxuaW1wb3J0IHsgQm9va0Nhcm91c2VsIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jYXJvdXNlbC9Cb29rQ2Fyb3VzZWwnO1xyXG5pbXBvcnQgeyBOYXZNZW51IH0gZnJvbSAnLi4vY29tcG9uZW50cy9uYXZNZW51L05hdk1lbnUnO1xyXG5pbXBvcnQgeyBCb29rc1NlYXJjaCB9IGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoL0Jvb2tzU2VhcmNoJztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25TdGF0ZSB9IGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0ICogYXMgQm9va3NTdGF0ZSBmcm9tICcuLi9zdG9yZS9Cb29rcyc7XHJcbmltcG9ydCB7IEFkZEJvb2sgfSBmcm9tICcuLi9jb21wb25lbnRzL2FkbWluL0FkZEJvb2snO1xyXG4vL3R5cGUgQm9va3NDb250YWluZXJQcm9wcyA9XHJcbi8vICAgIEJvb2tzU3RhdGUuQm9va3NTdGF0ZVxyXG4vLyAgICAmIHR5cGVvZiBCb29rc1N0YXRlLmFjdGlvbkNyZWF0b3JzXHJcbi8vICAgICYgUm91dGVDb21wb25lbnRQcm9wczx7IHN0YXJ0RGF0ZUluZGV4OiBzdHJpbmcgfT47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZG1pbkNvbnRhaW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSb3V0ZUNvbXBvbmVudFByb3BzPHsgfT4sIHt9PiB7XHJcbiAgICAvL2NvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIC8vICAgIHRoaXMucHJvcHMucmVxdWVzdEJvb2tzKFwiXCIpO1xyXG4gICAgLy8gICAgdGhpcy5wcm9wcy5yZXF1ZXN0Q2Fyb3VzZWxCb29rcygpO1xyXG4gICAgLy99XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPEFkZEJvb2sgLz5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuLy8gICAgKHN0YXRlOiBBcHBsaWNhdGlvblN0YXRlKSA9PiBzdGF0ZS5ib29rcywgLy8gU2VsZWN0cyB3aGljaCBzdGF0ZSBwcm9wZXJ0aWVzIGFyZSBtZXJnZWQgaW50byB0aGUgY29tcG9uZW50J3MgcHJvcHNcclxuLy8gICAgQm9va3NTdGF0ZS5hY3Rpb25DcmVhdG9ycyAgICAgICAgICAgICAgICAgLy8gU2VsZWN0cyB3aGljaCBhY3Rpb24gY3JlYXRvcnMgYXJlIG1lcmdlZCBpbnRvIHRoZSBjb21wb25lbnQncyBwcm9wc1xyXG4vLykoQm9va3NDb250YWluZXIpIGFzIHR5cGVvZiBCb29rc0NvbnRhaW5lcjtcclxuXHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbnRhaW5lcnMvQWRtaW5Db250YWluZXIudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWJzIH0gZnJvbSAnLi4vY29tcG9uZW50cy9CcmVhZGNydW1icyc7XHJcbmltcG9ydCB7IEJvb2tzTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvYm9va3NMaXN0L0Jvb2tzTGlzdCc7XHJcbmltcG9ydCB7IEJvb2tDYXJvdXNlbCB9IGZyb20gJy4uL2NvbXBvbmVudHMvY2Fyb3VzZWwvQm9va0Nhcm91c2VsJztcclxuaW1wb3J0IHsgTmF2TWVudSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmF2TWVudS9OYXZNZW51JztcclxuaW1wb3J0IHsgQm9va3NTZWFyY2ggfSBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaC9Cb29rc1NlYXJjaCc7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uU3RhdGUgfSBmcm9tICcuLi9zdG9yZSc7XHJcbmltcG9ydCAqIGFzIEJvb2tzU3RhdGUgZnJvbSAnLi4vc3RvcmUvQm9va3MnO1xyXG5pbXBvcnQgeyBBdXRvciB9IGZyb20gJy4uL2NvbXBvbmVudHMvYXV0b3IvQXV0b3InO1xyXG4vL3R5cGUgQm9va3NDb250YWluZXJQcm9wcyA9XHJcbi8vICAgIEJvb2tzU3RhdGUuQm9va3NTdGF0ZVxyXG4vLyAgICAmIHR5cGVvZiBCb29rc1N0YXRlLmFjdGlvbkNyZWF0b3JzXHJcbi8vICAgICYgUm91dGVDb21wb25lbnRQcm9wczx7IHN0YXJ0RGF0ZUluZGV4OiBzdHJpbmcgfT47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZG1pbkNvbnRhaW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSb3V0ZUNvbXBvbmVudFByb3BzPHsgfT4sIHt9PiB7XHJcbiAgICAvL2NvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIC8vICAgIHRoaXMucHJvcHMucmVxdWVzdEJvb2tzKFwiXCIpO1xyXG4gICAgLy8gICAgdGhpcy5wcm9wcy5yZXF1ZXN0Q2Fyb3VzZWxCb29rcygpO1xyXG4gICAgLy99XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPEF1dG9yIC8+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxyXG4vL2V4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbi8vICAgIChzdGF0ZTogQXBwbGljYXRpb25TdGF0ZSkgPT4gc3RhdGUuYm9va3MsIC8vIFNlbGVjdHMgd2hpY2ggc3RhdGUgcHJvcGVydGllcyBhcmUgbWVyZ2VkIGludG8gdGhlIGNvbXBvbmVudCdzIHByb3BzXHJcbi8vICAgIEJvb2tzU3RhdGUuYWN0aW9uQ3JlYXRvcnMgICAgICAgICAgICAgICAgIC8vIFNlbGVjdHMgd2hpY2ggYWN0aW9uIGNyZWF0b3JzIGFyZSBtZXJnZWQgaW50byB0aGUgY29tcG9uZW50J3MgcHJvcHNcclxuLy8pKEJvb2tzQ29udGFpbmVyKSBhcyB0eXBlb2YgQm9va3NDb250YWluZXI7XHJcblxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb250YWluZXJzL0F1dG9yQ29udGFpbmVyLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBCcmVhZGNydW1icyB9IGZyb20gJy4uL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMnO1xyXG5pbXBvcnQgeyBOYXZNZW51IH0gZnJvbSAnLi4vY29tcG9uZW50cy9uYXZNZW51L05hdk1lbnUnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgKiBhcyBCb29rQm9keVN0YXRlIGZyb20gJy4uL3N0b3JlL0Jvb2tCb2R5JztcclxuXHJcbnR5cGUgQm9va3NDb250YWluZXJQcm9wcyA9XHJcbiAgICBCb29rQm9keVN0YXRlLkJvb2tCb2R5U3RhdGVcclxuICAgICYgdHlwZW9mIEJvb2tCb2R5U3RhdGUuYWN0aW9uQ3JlYXRvcnNcclxuICAgICYgUm91dGVDb21wb25lbnRQcm9wczx7IGJvb2tJZDogbnVtYmVyIH0+O1xyXG5cclxuY2xhc3MgQm9va0JvZHlDb250YWluZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Qm9va3NDb250YWluZXJQcm9wcywge30+IHtcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmdldEJvb2tUZXh0QnlJRCh0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5ib29rSWQpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxzcGFuPnRoZW1lcyBzd2l0Y2hlcjwvc3Bhbj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBpc2xhbmQnPlxyXG4gICAgICAgICAgICAgICAgPEJyZWFkY3J1bWJzIC8+XHJcbiAgICAgICAgICAgICAgICA8TmF2TWVudSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jvdyc+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5ib29rVGV4dH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgKHN0YXRlOiBBcHBsaWNhdGlvblN0YXRlKSA9PiBzdGF0ZS5ib29rQm9keSwgLy8gU2VsZWN0cyB3aGljaCBzdGF0ZSBwcm9wZXJ0aWVzIGFyZSBtZXJnZWQgaW50byB0aGUgY29tcG9uZW50J3MgcHJvcHNcclxuICAgIEJvb2tCb2R5U3RhdGUuYWN0aW9uQ3JlYXRvcnMgICAgICAgICAgICAgICAgIC8vIFNlbGVjdHMgd2hpY2ggYWN0aW9uIGNyZWF0b3JzIGFyZSBtZXJnZWQgaW50byB0aGUgY29tcG9uZW50J3MgcHJvcHNcclxuKShCb29rQm9keUNvbnRhaW5lcikgYXMgdHlwZW9mIEJvb2tCb2R5Q29udGFpbmVyO1xyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb250YWluZXJzL0Jvb2tCb2R5Q29udGFpbmVyLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBCcmVhZGNydW1icyB9IGZyb20gJy4uL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMnO1xyXG5pbXBvcnQgeyBCb29rc0xpc3QgfSBmcm9tICcuLi9jb21wb25lbnRzL2Jvb2tzTGlzdC9Cb29rc0xpc3QnO1xyXG5pbXBvcnQgeyBCb29rQ2Fyb3VzZWwgfSBmcm9tICcuLi9jb21wb25lbnRzL2Nhcm91c2VsL0Jvb2tDYXJvdXNlbCc7XHJcbmltcG9ydCB7IE5hdk1lbnUgfSBmcm9tICcuLi9jb21wb25lbnRzL25hdk1lbnUvTmF2TWVudSc7XHJcbmltcG9ydCB7IEJvb2tzU2VhcmNoIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2gvQm9va3NTZWFyY2gnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgKiBhcyBCb29rc1N0YXRlIGZyb20gJy4uL3N0b3JlL0Jvb2tzJztcclxuXHJcbnR5cGUgQm9va3NDb250YWluZXJQcm9wcyA9XHJcbiAgICBCb29rc1N0YXRlLkJvb2tzU3RhdGVcclxuICAgICYgdHlwZW9mIEJvb2tzU3RhdGUuYWN0aW9uQ3JlYXRvcnNcclxuICAgICYgUm91dGVDb21wb25lbnRQcm9wczx7IHN0YXJ0RGF0ZUluZGV4OiBzdHJpbmcgfT47XHJcblxyXG5jbGFzcyBCb29rc0NvbnRhaW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxCb29rc0NvbnRhaW5lclByb3BzLCB7fT4ge1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMucmVxdWVzdEJvb2tzKFwiXCIpO1xyXG4gICAgICAgIHRoaXMucHJvcHMucmVxdWVzdENhcm91c2VsQm9va3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8c3Bhbj50aGVtZXMgc3dpdGNoZXI8L3NwYW4+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgaXNsYW5kJz5cclxuICAgICAgICAgICAgICAgIDxCb29rQ2Fyb3VzZWwgYm9va3M9e3RoaXMucHJvcHMuY2Fyb3VzZWxCb29rc30gLz5cclxuICAgICAgICAgICAgICAgIDxCcmVhZGNydW1icyAvPlxyXG4gICAgICAgICAgICAgICAgPE5hdk1lbnUgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbC1zbS0zIGlzbGFuZCc+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJvb2tzU2VhcmNoIHJlcXVlc3RCb29rcz17dGhpcy5wcm9wcy5yZXF1ZXN0Qm9va3N9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtc20tOSc+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJvb2tzTGlzdCBib29rcz17dGhpcy5wcm9wcy5ib29rc30gc29ydEJvb2tzPXt0aGlzLnByb3BzLnNvcnRCb29rc30gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICAoc3RhdGU6IEFwcGxpY2F0aW9uU3RhdGUpID0+IHN0YXRlLmJvb2tzLCAvLyBTZWxlY3RzIHdoaWNoIHN0YXRlIHByb3BlcnRpZXMgYXJlIG1lcmdlZCBpbnRvIHRoZSBjb21wb25lbnQncyBwcm9wc1xyXG4gICAgQm9va3NTdGF0ZS5hY3Rpb25DcmVhdG9ycyAgICAgICAgICAgICAgICAgLy8gU2VsZWN0cyB3aGljaCBhY3Rpb24gY3JlYXRvcnMgYXJlIG1lcmdlZCBpbnRvIHRoZSBjb21wb25lbnQncyBwcm9wc1xyXG4pKEJvb2tzQ29udGFpbmVyKSBhcyB0eXBlb2YgQm9va3NDb250YWluZXI7XHJcblxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb250YWluZXJzL0Jvb2tzQ29udGFpbmVyLnRzeCIsImltcG9ydCAqIGFzIEJvb2tzIGZyb20gJy4vQm9va3MnO1xyXG5pbXBvcnQgKiBhcyBCb29rQm9keSBmcm9tICcuL0Jvb2tCb2R5JztcclxuXHJcbi8vIFRoZSB0b3AtbGV2ZWwgc3RhdGUgb2JqZWN0XHJcbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpb25TdGF0ZSB7XHJcbiAgICBib29rczogQm9va3MuQm9va3NTdGF0ZTtcclxuICAgIGJvb2tCb2R5OiBCb29rQm9keS5Cb29rQm9keVN0YXRlXHJcbn1cclxuXHJcbi8vIFdoZW5ldmVyIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLCBSZWR1eCB3aWxsIHVwZGF0ZSBlYWNoIHRvcC1sZXZlbCBhcHBsaWNhdGlvbiBzdGF0ZSBwcm9wZXJ0eSB1c2luZ1xyXG4vLyB0aGUgcmVkdWNlciB3aXRoIHRoZSBtYXRjaGluZyBuYW1lLiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBuYW1lcyBtYXRjaCBleGFjdGx5LCBhbmQgdGhhdCB0aGUgcmVkdWNlclxyXG4vLyBhY3RzIG9uIHRoZSBjb3JyZXNwb25kaW5nIEFwcGxpY2F0aW9uU3RhdGUgcHJvcGVydHkgdHlwZS5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXJzID0ge1xyXG4gICAgYm9va3M6IEJvb2tzLnJlZHVjZXIsXHJcbiAgICBib29rQm9keTogQm9va0JvZHkucmVkdWNlclxyXG59O1xyXG5cclxuLy8gVGhpcyB0eXBlIGNhbiBiZSB1c2VkIGFzIGEgaGludCBvbiBhY3Rpb24gY3JlYXRvcnMgc28gdGhhdCBpdHMgJ2Rpc3BhdGNoJyBhbmQgJ2dldFN0YXRlJyBwYXJhbXMgYXJlXHJcbi8vIGNvcnJlY3RseSB0eXBlZCB0byBtYXRjaCB5b3VyIHN0b3JlLlxyXG5leHBvcnQgaW50ZXJmYWNlIEFwcFRodW5rQWN0aW9uPFRBY3Rpb24+IHtcclxuICAgIChkaXNwYXRjaDogKGFjdGlvbjogVEFjdGlvbikgPT4gdm9pZCwgZ2V0U3RhdGU6ICgpID0+IEFwcGxpY2F0aW9uU3RhdGUpOiB2b2lkO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9zdG9yZS9pbmRleC50cyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMSkpKDE0Myk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMSkpKDcwKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==