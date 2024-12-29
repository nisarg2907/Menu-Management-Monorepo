import React, { useState, useEffect } from 'react';
import { MenuItem } from '../../types';

interface FormProps {
  selectedItem: MenuItem | null;
  onSave: (id: string, data: Partial<MenuItem>) => Promise<void>;
  onCancel: () => void;
}

const Form: React.FC<FormProps> = ({ selectedItem, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    depth: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        name: selectedItem.name,
        depth: selectedItem.depth,
      });
    }
  }, [selectedItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    try {
      setIsSubmitting(true);
      await onSave(selectedItem.id, formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedItem) {
    return (
      <div className="w-[350px] bg-gray-50 p-6 rounded-lg text-center text-gray-500">
        Select an item to edit
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-[350px] bg-white p-6 rounded-lg">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Menu ID</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            value={selectedItem.id}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Depth</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            value={formData.depth}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;