const Index = ({ source, size, alt, textColor, text }) => {
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${source})`,
        minHeight: "25px",
        minWidth: "135.5px",
        padding: "20px",
        marginBottom: "20px",
        marginRight: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: textColor ?? "red",
          flex: "1 0 15%",
        }}
      >
        {text}
      </div>
    </div>
  );
};
export default Index;
