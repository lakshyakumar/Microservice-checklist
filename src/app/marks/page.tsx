'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Mark {
  rollNumber: string;
  name: string;
  grade: string;
  section: string;
  subject: string;
  marks: number;
}

const Page = () => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMarks, setFilteredMarks] = useState<Mark[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [newRecord, setNewRecord] = useState<Mark>({
    rollNumber: '',
    name: '',
    grade: '',
    subject: '',
    section: '',
    marks: 0,
  });
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleSearch = () => {
    if (searchTerm === '') {
      setFilteredMarks(marks);
    } else {
      const filtered = marks.filter((record) => record.rollNumber.toString().includes(searchTerm));
      setFilteredMarks(filtered);
    }
  };

  const handleAddRecord = async () => {
    if (
      newRecord.rollNumber === '' ||
      newRecord.name === '' ||
      newRecord.grade === '' ||
      newRecord.subject === '' ||
      newRecord.section === '' ||
      newRecord.marks < 0
    ) {
      return;
    }
    try {
      const response = await axios.post('/api/marks', { ...newRecord, marks: newRecord.marks });
      if (!response.data.success) {
        throw new Error(response.data.error);
      }
    } catch (e) {
      console.error((e as Error).message, 'while adding marks');
      throw new Error((e as Error).message);
    }
    setMarks([...marks, newRecord]);
    setFilteredMarks([...marks, newRecord]);
    setShowPopup(false);
    setNewRecord({
      rollNumber: '',
      name: '',
      grade: '',
      subject: '',
      section: '',
      marks: 0,
    });
  };

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await axios.get('/api/marks');
        setMarks(response.data.marksList);
        setFilteredMarks(response.data.marksList);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const checkHealth = async () => {
      try {
        const response = await axios.get('/api/health');
        if (response.status === 200) {
          setIsConnected(true);
        }
      } catch (error) {
        console.error((error as Error).message, 'while checking health');
        setIsConnected(false);
      }
    };

    fetchMarks();
    checkHealth();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">University marks records</h1>
          {isConnected && (
            <div className="flex items-center">
              <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
              <span>Connected</span>
            </div>
          )}
        </div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-l"
            placeholder="Search by Roll Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 rounded-r" onClick={handleSearch}>
            Search
          </button>
          <button className="bg-green-500 text-white p-2 rounded ml-2" onClick={() => setShowPopup(true)}>
            +
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Roll Number</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Grade</th>
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Section</th>
              <th className="py-2 px-4 border-b">marks</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarks.map((record, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{record.rollNumber}</td>
                <td className="py-2 px-4 border-b text-center">{record.name}</td>
                <td className="py-2 px-4 border-b text-center">{record.grade}</td>
                <td className="py-2 px-4 border-b text-center">{record.subject}</td>
                <td className="py-2 px-4 border-b text-center">{record.section}</td>
                <td className="py-2 px-4 border-b text-center">{record.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl mb-4">Add New Record</h2>
            <input
              type="text"
              className="border border-gray-300 p-2 mb-2 w-full"
              placeholder="Roll Number"
              value={newRecord.rollNumber}
              onChange={(e) => setNewRecord({ ...newRecord, rollNumber: e.target.value })}
            />
            <input
              type="text"
              className="border border-gray-300 p-2 mb-2 w-full"
              placeholder="Name"
              value={newRecord.name}
              onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
            />
            <input
              type="text"
              className="border border-gray-300 p-2 mb-2 w-full"
              placeholder="Grade"
              value={newRecord.grade}
              onChange={(e) => setNewRecord({ ...newRecord, grade: e.target.value })}
            />
            <input
              type="text"
              className="border border-gray-300 p-2 mb-2 w-full"
              placeholder="Subject"
              value={newRecord.subject}
              onChange={(e) => setNewRecord({ ...newRecord, subject: e.target.value })}
            />
            <input
              type="text"
              className="border border-gray-300 p-2 mb-2 w-full"
              placeholder="Section"
              value={newRecord.section}
              onChange={(e) => setNewRecord({ ...newRecord, section: e.target.value })}
            />
            <input
              type="number"
              className="border border-gray-300 p-2 mb-2 w-full"
              placeholder="marks"
              value={newRecord.marks}
              onChange={(e) => setNewRecord({ ...newRecord, marks: parseInt(e.target.value) })}
            />
            <div className="flex justify-end">
              <button className="bg-red-500 text-white p-2 rounded mr-2" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddRecord}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
