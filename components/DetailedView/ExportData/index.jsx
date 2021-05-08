import React from 'react';
import { CSVLink } from 'react-csv';

export default function ExportData({ responses }) {

    const headers = [
        { label: 'First Name', key: 'firstName'},
        { label: 'Last Name', key: 'lastName'},
        { label: 'Email', key: 'user.email'},
        { label: 'Grade', key: 'gradeLevel'},
        { label: 'School', key: 'schoolName'}
    ];

  return (
        <CSVLink
            data={responses}
            headers={headers}
            filename={"signups.csv"}
            target="_blank"
        >
            <button className="px-8 py-4 my-3 text-xl text-white bg-blue-700 rounded-xl focus:outline-none">Export Data</button>
        </CSVLink>
    
  );
}
