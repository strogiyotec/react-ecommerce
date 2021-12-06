const authProvider = {
    login: ({username, password}) => {
        const request = new Request('http://localhost:8080/users/auth', {
            method: 'POST',
            body: JSON.stringify({"email": username, "password": password}),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
                localStorage.setItem('name', auth.name);
                localStorage.setItem('isAdmin', auth.isAdmin);
            })
            .catch(() => {
                throw new Error('Network error')
            });
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    checkAuth: () => localStorage.getItem('auth')
        ? Promise.resolve()
        : Promise.reject(),
    logout: () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('isAdmin');
        return Promise.resolve();
    },
    getPermissions: () => {
        const role = localStorage.getItem('isAdmin');
        return role ? Promise.resolve(role) : Promise.reject();
    },
    getIdentity: () => {
        try {
            const name = localStorage.getItem('name');
            return Promise.resolve({'fullName': name});
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

export default authProvider
