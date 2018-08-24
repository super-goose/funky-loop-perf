import Template from './template-manager';

const FA_MINUS = 'fa-minus';
const FA_UP = 'fa-arrow-up';
const FA_DOWN = 'fa-arrow-down';

export default function () {
    let _lastPrice = null;
    let _priceDiff = 0;

    return function (_vph, i) {
        _lastPrice && (_priceDiff = _vph.Price - _lastPrice);
        _lastPrice = _vph.Price;
        
        let _d = new Date(_vph.Date);

        let _sign = '';
        let _dash = FA_MINUS;
        let _new = '';
        
        if (_priceDiff < 0) {
            _sign = '-';
            _dash = FA_DOWN;
        } else if (_priceDiff > 0) {
            _sign = '+';
            _dash = FA_UP;
        }
        
        if (i === 0 && _d.addDays(14) > new Date()) {
            _new = 'new';
        }
        
        return Template.MapToTemplate('template-price-change-entry', {
            '{{HIDDEN}}':     i > 1 ? 'price-change-hidden' : '',
            '{{CURRENT}}':    i === 0 ? 'table-current' : '',
            '{{NEW}}':        _new,
            '{{DATE}}':       _d,
            '{{PRICE}}':      _vph.Price,
            '{{MILEAGE}}':    _vph.Mileage,
            '{{UPDOWNDASH}}': _dash,
            '{{SIGN}}':       _sign,
            '{{DIFFERENCE}}': Math.abs(_priceDiff),
        });
    } 
}
