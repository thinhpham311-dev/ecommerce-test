import React from 'react';
import EmptyCart from '../EmptyCart/EmptyCart';

const DataTable = ({ data, columns, className }) => {

    if (data?.length === 0) {
        return <EmptyCart />;
    }

    return (
        <table className={className}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} data-label={column.header}>
                                {column.render ? column.render(row) : row[column.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;