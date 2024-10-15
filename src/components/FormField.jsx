const FormField = ({ id, label, value, onChange, placeholder, type = 'text', isTextArea = false }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-lg font-medium text-gray-700">
            {label}
        </label>
        {isTextArea ? (
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder={placeholder}
                rows="8"
            ></textarea>
        ) : (
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder={placeholder}
            />
        )}
    </div>
);

export default FormField