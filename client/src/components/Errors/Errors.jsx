const Errors = ({ children, ...props }) => {
    return (
        <div
            style={{
                color: '#f23838',
                marginTop: '5px',
                fontSize: '16px'
            }}
        >
            {children}
        </div>
    );
};

export default Errors;
