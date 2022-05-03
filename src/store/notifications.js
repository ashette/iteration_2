
export default {
    namespaced: true,
    state: {
        notifications: []
    },
    mutations: {
        addNotification(state, notification) {
            if (state.notifications.length > 3) {
                state.notifications.shift();
            }

            state.notifications.push({
                ...notification,
                id: (Date.now().toString())
            })
        },
        removeNotification(state, notification) {
            state.notifications = state.notifications.filter(item => {
                return item.id != notification.id;
            })
        }
    },
    actions: {
        addNotification({ commit }, notification) {
            commit('addNotification', notification);
        },
        removeNotification({ commit }, notification) {
            commit('removeNotification', notification);
        }
    }
}