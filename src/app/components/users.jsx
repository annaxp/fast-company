import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [curentPage, setCurentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurentPage(pageIndex);
    };

    const userCrop = paginate(users, curentPage, pageSize);

    return (
        <>
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User key={user._id} {...rest} {...user} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                curentPage={curentPage}
                onPageChange={handlePageChange}
            />
            {/* 1,2,3 */}
            {/* users/pageSize */}
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};
export default Users;
