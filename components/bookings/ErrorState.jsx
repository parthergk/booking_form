const ErrorState = ({ message }) => {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="text-red-500 bg-red-50 p-4 rounded-lg">
          {message}
        </div>
      </div>
    );
  }; 

  export default ErrorState;