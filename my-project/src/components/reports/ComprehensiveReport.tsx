const ComprehensiveReport = ({ feedback }: { feedback: string }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <p>{feedback || "피드백을 생성중입니다.."}</p>
    </div>
  );
};

export default ComprehensiveReport;
