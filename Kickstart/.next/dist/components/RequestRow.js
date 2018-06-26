'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _campaign = require('../ethereum/campaign');

var _campaign2 = _interopRequireDefault(_campaign);

var _nextRoutes = require('next-routes');

var _nextRoutes2 = _interopRequireDefault(_nextRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\cfarr\\Documents\\Work\\Kickstart\\components\\RequestRow.js';


var RequestRow = function (_Component) {
  (0, _inherits3.default)(RequestRow, _Component);

  function RequestRow() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RequestRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RequestRow.__proto__ || (0, _getPrototypeOf2.default)(RequestRow)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isApproving: false,
      isFinalizing: false,
      errorMessage: '',
      isAllowed: true
    }, _this.onApprove = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var campaign, accounts;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({ isApproving: true });
              campaign = (0, _campaign2.default)(_this.props.address);
              _context.next = 4;
              return _web2.default.eth.getAccounts();

            case 4:
              accounts = _context.sent;
              _context.next = 7;
              return campaign.methods.approveRequest(_this.props.id).send({ from: accounts[0] });

            case 7:
              _this.setState({ isApproving: false });

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.onFinalize = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var campaign, accounts;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.setState({ isFinalizing: true });
              campaign = (0, _campaign2.default)(_this.props.address);
              _context2.next = 4;
              return _web2.default.eth.getAccounts();

            case 4:
              accounts = _context2.sent;

              console.log(_this.props.manager);

              if (!(accounts[0] == _this.props.manager)) {
                _context2.next = 12;
                break;
              }

              _context2.next = 9;
              return campaign.methods.finalizeRequest(_this.props.id).send({ from: accounts[0] });

            case 9:
              _this.setState({ isFinalizing: false });
              _context2.next = 13;
              break;

            case 12:
              _this.setState({ isAllowed: false });

            case 13:
              console.log(_this.state.isAllowed);

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RequestRow, [{
    key: 'render',
    value: function render() {
      var Row = _semanticUiReact.Table.Row,
          Cell = _semanticUiReact.Table.Cell;
      var _props = this.props,
          id = _props.id,
          request = _props.request,
          contributers = _props.contributers;

      var readyToFinalize = request.approvalCount > contributers / 2;
      var button = void 0;
      if (this.state.isAllowed) {
        button = _react2.default.createElement(_semanticUiReact.Button, {
          color: 'blue',
          basic: true,
          onClick: this.onFinalize,
          loading: this.state.isFinalizing,
          disabled: this.state.isApproving,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 43
          }
        }, 'Finalize');
      } else {
        console.log('rightpath');
        _react2.default.createElement(_semanticUiReact.Button, { color: 'red', basic: true, disabled: true, __source: {
            fileName: _jsxFileName,
            lineNumber: 55
          }
        }, 'You are not the manager');
      }

      return _react2.default.createElement(Row, { disabled: request.complete, positive: readyToFinalize && !request.complete, __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }, _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        }
      }, id + 1), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        }
      }, request.description), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, _web2.default.utils.fromWei(request.value, 'ether')), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      }, request.recipient), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, request.approvalCount, '/', contributers), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, request.complete ? null : _react2.default.createElement(_semanticUiReact.Button, {
        color: 'green',
        basic: true,
        onClick: this.onApprove,
        loading: this.state.isApproving,
        disabled: this.state.isFinalizing,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, 'Approve')), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        }
      }, request.complete ? 'This request has been finalized' : button));
    }
  }]);

  return RequestRow;
}(_react.Component);

exports.default = RequestRow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXFJlcXVlc3RSb3cuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJUYWJsZSIsIkJ1dHRvbiIsIndlYjMiLCJDYW1wYWlnbiIsIlJvdXRlcyIsIlJlcXVlc3RSb3ciLCJzdGF0ZSIsImlzQXBwcm92aW5nIiwiaXNGaW5hbGl6aW5nIiwiZXJyb3JNZXNzYWdlIiwiaXNBbGxvd2VkIiwib25BcHByb3ZlIiwic2V0U3RhdGUiLCJjYW1wYWlnbiIsInByb3BzIiwiYWRkcmVzcyIsImV0aCIsImdldEFjY291bnRzIiwiYWNjb3VudHMiLCJtZXRob2RzIiwiYXBwcm92ZVJlcXVlc3QiLCJpZCIsInNlbmQiLCJmcm9tIiwib25GaW5hbGl6ZSIsImNvbnNvbGUiLCJsb2ciLCJtYW5hZ2VyIiwiZmluYWxpemVSZXF1ZXN0IiwiUm93IiwiQ2VsbCIsInJlcXVlc3QiLCJjb250cmlidXRlcnMiLCJyZWFkeVRvRmluYWxpemUiLCJhcHByb3ZhbENvdW50IiwiYnV0dG9uIiwiY29tcGxldGUiLCJkZXNjcmlwdGlvbiIsInV0aWxzIiwiZnJvbVdlaSIsInZhbHVlIiwicmVjaXBpZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTzs7QUFDaEIsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPOzs7Ozs7Ozs7SSxBQUVEOzs7Ozs7Ozs7Ozs7Ozs7b05BQ0osQTttQkFBUSxBQUNPLEFBQ2I7b0JBRk0sQUFFUSxBQUNkO29CQUhNLEFBR1EsQUFDZDtpQkFKTSxBQUlLLEE7QUFKTCxBQUNOLGEsQUFLRixxRkFBWSxtQkFBQTtvQkFBQTtvRUFBQTtrQkFBQTsyQ0FBQTtpQkFDVjtvQkFBQSxBQUFLLFNBQVMsRUFBRSxhQUFoQixBQUFjLEFBQWUsQUFDdkI7QUFGSSx5QkFFTyx3QkFBUyxNQUFBLEFBQUssTUFGckIsQUFF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QUNmLDRCQUFDLGNBQUQ7O29CQUFBO3NCQUFBLEFBQ0c7QUFESDtBQUFBLGlCQUFBLEFBQ1csZUFBZ0IsS0FON0IsQUFLRSxBQUdBLCtCQUFDLGNBQUQ7O29CQUFBO3NCQUFBLEFBQ0c7QUFESDtBQUFBLGlCQUNHLEFBQVEsV0FBUixBQUFtQix1QkFDbEIsQUFBQztlQUFELEFBQ1EsQUFDTjtlQUZGLEFBR0U7aUJBQVMsS0FIWCxBQUdnQixBQUNkO2lCQUFTLEtBQUEsQUFBSyxNQUpoQixBQUlzQixBQUNwQjtrQkFBVSxLQUFBLEFBQUssTUFMakIsQUFLdUI7O29CQUx2QjtzQkFBQTtBQUFBO0FBQ0UsT0FERixFQVZOLEFBUUUsQUFFSSxBQVdKLDZCQUFDLGNBQUQ7O29CQUFBO3NCQUFBLEFBQU87QUFBUDtBQUFBLGlCQUFPLEFBQVEsV0FBUixBQUFtQixvQ0F0QjlCLEFBQ0UsQUFxQkUsQUFBOEQsQUFHbkU7Ozs7O0FBOUVzQixBLEFBaUZ6Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJSZXF1ZXN0Um93LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2NmYXJyL0RvY3VtZW50cy9Xb3JrL0tpY2tzdGFydCJ9