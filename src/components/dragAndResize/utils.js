export function addEvent(el, event, handler) {
    if (!el) {
        return;
    }
    if (el.attachEvent) {
        el.attachEvent('on' + event, handler);
    } else if (el.addEventListener) {
        el.addEventListener(event, handler, true);
    } else {
        el['on' + event] = handler;
    }
}

export function removeEvent(el, event, handler) {
    if (!el) {
        return;
    }
    if (el.detachEvent) {
        el.detachEvent('on' + event, handler);
    } else if (el.removeEventListener) {
        el.removeEventListener(event, handler, true);
    } else {
        el['on' + event] = null;
    }
}

export function restrictToBounds(value, min, max) {
    if (min !== null && value < min) {
        return min;
    }
    if (max !== null && max < value) {
        return max;
    }
    return value;
}
