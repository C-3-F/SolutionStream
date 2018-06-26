'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _Layout = require('../../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _semanticUiReact = require('semantic-ui-react');

var _routes = require('../../../routes');

var _campaign = require('../../../ethereum/campaign');

var _campaign2 = _interopRequireDefault(_campaign);

var _RequestRow = require('../../../components/RequestRow');

var _RequestRow2 = _interopRequireDefault(_RequestRow);

var _nextRoutes = require('next-routes');

var _nextRoutes2 = _interopRequireDefault(_nextRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\cfarr\\Documents\\Work\\Kickstart\\pages\\campaigns\\requests\\index.js?entry';


var RequestIndex = function (_Component) {
  (0, _inherits3.default)(RequestIndex, _Component);

  function RequestIndex() {
    (0, _classCallCheck3.default)(this, RequestIndex);

    return (0, _possibleConstructorReturn3.default)(this, (RequestIndex.__proto__ || (0, _getPrototypeOf2.default)(RequestIndex)).apply(this, arguments));
  }

  (0, _createClass3.default)(RequestIndex, [{
    key: 'renderRow',
    value: function renderRow() {
      var _this2 = this;

      if (this.props.requestCount == 0) {
        return;
      } else {
        return this.props.requests.map(function (request, index) {
          return _react2.default.createElement(_RequestRow2.default, {
            id: index,
            key: index,
            request: request,
            address: _this2.props.address,
            contributers: _this2.props.approversCount,
            manager: _this2.props.manager,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 38
            }
          });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var Header = _semanticUiReact.Table.Header,
          Row = _semanticUiReact.Table.Row,
          HeaderCell = _semanticUiReact.Table.HeaderCell,
          Body = _semanticUiReact.Table.Body;

      return _react2.default.createElement(_Layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }, _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      }, 'Requests'), _react2.default.createElement(_routes.Link, { route: '/campaigns/' + this.props.address + '/requests/new', __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }, _react2.default.createElement(_semanticUiReact.Button, { primary: true, floated: 'right', style: { marginBottom: 10 }, __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }, 'Add Request'))), _react2.default.createElement(_semanticUiReact.Table, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, _react2.default.createElement(Header, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      }, _react2.default.createElement(Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }, 'ID'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, 'Description'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, 'Amount (Ether)'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      }, 'Recipient'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, 'Approval Count'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, 'Approve'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }, 'Finalize'))), _react2.default.createElement(Body, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, this.renderRow())), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }, 'Found ', this.props.requestCount, ' requests'));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
        var address, campaign, requestCount, approversCount, manager, requests;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                address = props.query.address;
                campaign = (0, _campaign2.default)(address);
                _context.next = 4;
                return campaign.methods.getRequestsCount().call();

              case 4:
                requestCount = _context.sent;
                _context.next = 7;
                return campaign.methods.approversCount().call();

              case 7:
                approversCount = _context.sent;
                _context.next = 10;
                return campaign.methods.manager().call();

              case 10:
                manager = _context.sent;

                if (!(requestCount != 0)) {
                  _context.next = 18;
                  break;
                }

                _context.next = 14;
                return _promise2.default.all(Array(parseInt(requestCount)).fill().map(function (element, index) {
                  return campaign.methods.requests(index).call();
                }));

              case 14:
                requests = _context.sent;
                return _context.abrupt('return', { address: address, requests: requests, requestCount: requestCount, approversCount: approversCount, manager: manager });

              case 18:
                return _context.abrupt('return', { address: address, requestCount: requestCount, approversCount: approversCount, manager: manager });

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return RequestIndex;
}(_react.Component);

exports.default = RequestIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxjYW1wYWlnbnNcXHJlcXVlc3RzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkxheW91dCIsIkJ1dHRvbiIsIlRhYmxlIiwiTGluayIsIkNhbXBhaWduIiwiUmVxdWVzdFJvdyIsIlJvdXRlcyIsIlJlcXVlc3RJbmRleCIsInByb3BzIiwicmVxdWVzdENvdW50IiwicmVxdWVzdHMiLCJtYXAiLCJyZXF1ZXN0IiwiaW5kZXgiLCJhZGRyZXNzIiwiYXBwcm92ZXJzQ291bnQiLCJtYW5hZ2VyIiwiSGVhZGVyIiwiUm93IiwiSGVhZGVyQ2VsbCIsIkJvZHkiLCJtYXJnaW5Cb3R0b20iLCJyZW5kZXJSb3ciLCJxdWVyeSIsImNhbXBhaWduIiwibWV0aG9kcyIsImdldFJlcXVlc3RzQ291bnQiLCJjYWxsIiwiYWxsIiwiQXJyYXkiLCJwYXJzZUludCIsImZpbGwiLCJlbGVtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBUyxBQUFROztBQUNqQixBQUFTLEFBQVk7O0FBQ3JCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQWdCOzs7O0FBQ3ZCLEFBQU87Ozs7Ozs7OztJQUVELEE7Ozs7Ozs7Ozs7O2dDQXVCUTttQkFDVjs7VUFBSSxLQUFBLEFBQUssTUFBTCxBQUFXLGdCQUFmLEFBQStCLEdBQUcsQUFDaEM7QUFDRDtBQUZELGFBRU8sQUFDTDtvQkFBTyxBQUFLLE1BQUwsQUFBVyxTQUFYLEFBQW9CLElBQUksVUFBQSxBQUFDLFNBQUQsQUFBVSxPQUFVLEFBQ2pEO2lDQUNFLEFBQUM7Z0JBQUQsQUFDTSxBQUNKO2lCQUZGLEFBRU8sQUFDTDtxQkFIRixBQUdXLEFBQ1Q7cUJBQVMsT0FBQSxBQUFLLE1BSmhCLEFBSXNCLEFBQ3BCOzBCQUFjLE9BQUEsQUFBSyxNQUxyQixBQUsyQixBQUN6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