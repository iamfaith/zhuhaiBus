        //��������
        function debounce(fn, interval, immediate) {
            //fnΪҪִ�еĺ���
            //intervalΪ�ȴ���ʱ��
            //immediate�ж��Ƿ�����ִ��
            var timeout;  //��ʱ��

            return function () { //����һ���հ�
                var context = this, args = arguments; //�Ȱѱ�������
                var later = function () {  //���Ժ�Ҫִ�еĴ����װ����
                    timeout = null; //�ɹ����ú������ʱ��
                    if (!immediate) fn.apply(context, args); //������ִ��ʱ�ſ��Ե���
                };

                var callNow = immediate && !timeout;  //�ж��Ƿ��������ã����������ʱ�����ڣ�����������
                clearTimeout(timeout);  //����ʲô������������ʱ�������������׵�
                timeout = setTimeout(later, interval);  //�ӳ�ִ��
                if (callNow) fn.apply(context, args);  //����ǵ�һ�δ���������immediateΪtrue��������ִ��
            };
        };



            //��������
        var throttle = function (fn, interval) { //fnΪҪִ�еĺ�����intervalΪ�ӳ�ʱ��
                var _self = fn,  //������Ҫ���ӳ�ִ�еĺ�������
                    timer,  //��ʱ��
                    firstTime = true;  //�Ƿ��һ�ε���

                return function () { //����һ���������γɱհ����־û�����
                    var args = arguments, //�������
                        _me = this;

                    if (firstTime) { //����ǵ�һ�ε��ã������ӳ�ִ��
                        _self.apply(_me, args);
                        return firstTime = false;
                    }

                    if (timer) { //�����ʱ�����ڣ�˵����һ���ӳ�ִ�л�û�����
                        return false;
                    }

                    timer = setTimeout(function () { //�ӳ�һ��ʱ��ִ��
                        clearTimeout(timer);
                        timer = null;
                        _self.apply(_me, args);
                    }, interval || 500);
                };
            };

var throttled = throttle(WowUil.initScroll, 100);