import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const CityList = props => {
    const { sections } = props;
    return (
        <div className="city-list">
            <ul className="city-ul">
                {sections.map(section => {
                    return (
                        section.citys &&
                        section.citys.map(city => (
                            <li className="city-li" key={city.name}>
                                {city.name}
                            </li>
                        ))
                    );
                })}
            </ul>
        </div>
    );
};

CityList.propTypes = {
    sections : PropTypes.array.isRequired
};

export default CityList;
