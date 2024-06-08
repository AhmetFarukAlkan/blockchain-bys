import Http from '../Http';

export const fetchUser = async () => {
    return Http.get("/users", {params: {pagination: 0}})
        .then(users => users.data.data)
        ;
};