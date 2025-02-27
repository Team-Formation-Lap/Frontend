const BehaviorReport = ({ feedback }: { feedback: string }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md mt-4">
      <p>{feedback || "피드백이 없습니다."}</p>
    </div>
  );
};

export default BehaviorReport;
