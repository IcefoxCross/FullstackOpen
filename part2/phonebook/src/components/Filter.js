/* jshint esversion: 9 */
import React from 'react';

const Filter = ({value, onChange}) => {
    return (
        <form>
            <div>
                filter shown with <input value={value} onChange={onChange} />
            </div>
        </form>
    )
}

export default Filter