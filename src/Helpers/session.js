export const auth = {
    getData() {
        const auth_data = JSON.parse(localStorage.getItem('auth_data'))
        if (auth_data) {
            return auth_data
        } else return false
    },
    login(data) {
        localStorage.setItem('auth_data', JSON.stringify(data))
        this.getData()
    },

    logout() {
        localStorage.removeItem('auth_data')
        this.getData()
    }
}