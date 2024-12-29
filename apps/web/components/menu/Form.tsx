import React from 'react';
import { MenuItem } from '../../types';

type FormProps = {
  selectedItem: MenuItem | null;
};

const Form: React.FC<FormProps> = ({ selectedItem }) => {
  return (
    <div className="w-[350px] bg-white p-6 rounded-lg">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Menu ID</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            value={selectedItem?.id || ''}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Depth</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            value={selectedItem?.depth.toString() || ''}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={selectedItem?.label || ''}
            onChange={() => {}}
          />
        </div>
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save
        </button>
      </div>
    </div>
  );
};

export default Form;
