export default (function () {

    function _mapToTextTemplate(template, data) {
        var loopIndex = template.indexOf('{{loop: ');
        var endLoopIndex = template.indexOf('{{endloop}}', loopIndex);
        while (loopIndex > -1 && endLoopIndex > -1) {
            var loopHtml = template.substring(loopIndex, endLoopIndex + 11);
            var loopTokenArray = loopHtml.match(/\{\{loop: +([^ ]+) +as +([^ \}]+) *\}\}/);
            var toBeLooped = loopHtml.substring(loopHtml.indexOf('}}') + 2, loopHtml.lastIndexOf('{{')).trim();

            var replacedHtml = '';

            var dataToken = '{{' + loopTokenArray[1] + '}}';
            var loopToken = '{{' + loopTokenArray[2] + '}}';

            if (data.hasOwnProperty(dataToken) && Array.isArray(data[dataToken])) {
                data[dataToken].forEach(function (t) {
                    replacedHtml += doTheReplacing(toBeLooped, loopToken, t);
                });
            }

            template = template.replace(loopHtml, replacedHtml);

            loopIndex = template.indexOf('{{loop: ');
            endLoopIndex = template.indexOf('{{endloop}}', loopIndex);
        }

        for (var token in data) {
            if (data.hasOwnProperty(token)) {
                template = doTheReplacing(template, token, data[token]);
            }
        }

        return template;
    }

    function _mapToTemplate(templateId, data) {
        var template = document.getElementById(templateId);
        if (template) {
            template = template.innerHTML.trim();

            template = _mapToTextTemplate(template, data);
        } else {
            template = '';
        }

        return template;

    }

    function doTheReplacing(str, token, text) {
        if (typeof text === 'undefined' || text === null) {
            text = '';
        }
        do {
            str = str.replace(token, text);
        } while (str.indexOf(token) !== -1);

        return str;
    }

    return {
        MapToTemplate: _mapToTemplate,
    };
})();
