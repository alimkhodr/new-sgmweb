export const checkTokenValidity = async () => {
    try {
        const response = await fetch('/api/check-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            return false;
        }

        return response.ok;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return false;
    }
};
