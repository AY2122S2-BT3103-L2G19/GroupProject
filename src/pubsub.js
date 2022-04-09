const subscribers = {};

export function subscribe(event,trigger) {
    if (!subscribers[event]) {
        subscribers[event] = []
      }
      subscribers[event].push(trigger)
}

export function publish(event) {
    if (!subscribers[event]) {
        return
    }
    subscribers[event].forEach(trigger => trigger())
}