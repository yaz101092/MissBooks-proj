function createEventEmitter() {
    const listenersMap = {}

    return {
<<<<<<< HEAD
=======
        // Use this function to subscribe to an event
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3
        on(evName, listener) {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
<<<<<<< HEAD
=======
        // Use this function to emit an event
>>>>>>> 91c56d9f990f5cb32f7b684a602a6d6ef61aabe3
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBusService = createEventEmitter()

function showUserMsg(msg) {
    eventBusService.emit('show-user-msg', msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({ txt, type: 'success' })
}

export function showErrorMsg(txt) {
    showUserMsg({ txt, type: 'error' })
}

window.showSuccessMsg = showSuccessMsg
window.showErrorMsg = showErrorMsg 