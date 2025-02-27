const ComprehensiveReport = ({ feedback }: { feedback: string }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <p>{feedback || "피드백이 없습니다."}</p>
    </div>
  );
};

export default ComprehensiveReport;
