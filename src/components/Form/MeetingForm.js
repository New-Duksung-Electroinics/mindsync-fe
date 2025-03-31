import React, { useState } from 'react';

function CreateMeetingForm() {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [representative, setRepresentative] = useState('');
  const [meetingType, setMeetingType] = useState('');

  const handleAddMember = (member) => {
    setSelectedMembers([...selectedMembers, member]);
  };

  const handleRemoveMember = (member) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member));
  };

  const handleCreateMeeting = () => {
    // 폼 데이터 처리 로직 (예: 서버로 보내기)
    console.log({
      meetingTitle,
      selectedMembers,
      representative,
      meetingType,
    });
  };

  return (
    <div className="w-[40vw] h-[60vh] mx-auto p-8 border rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">회의 시작하기</h2>

      <div className="mb-4">
        <label htmlFor="meetingTitle" className="block text-sm font-medium text-gray-700">회의 제목</label>
        <input
          type="text"
          id="meetingTitle"
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
          placeholder="회의 제목을 입력하세요"
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="members" className="block text-sm font-medium text-gray-700">멤버 초대하기</label>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex gap-2">
            {selectedMembers.map((member, index) => (
              <div key={index} className="flex items-center bg-gray-200 p-2 rounded-md">
                <img src={member.icon} alt={member.name} className="w-8 h-8 rounded-full mr-2" />
                <span>{member.name}</span>
                <button onClick={() => handleRemoveMember(member)} className="ml-2 text-red-500">x</button>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleAddMember({ name: 'John Doe', icon: 'https://via.placeholder.com/50' })} // 예시로 아이템 추가
            className="flex items-center text-blue-500 border p-2 rounded-md"
          >
            <span>+</span> 초대하기
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="representative" className="block text-sm font-medium text-gray-700">대표자 지정</label>
        <select
          id="representative"
          value={representative}
          onChange={(e) => setRepresentative(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
        >
          <option value="">대표자를 선택하세요</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700">어떤 회의를 원하시나요?</label>
        <textarea
          id="meetingType"
          value={meetingType}
          onChange={(e) => setMeetingType(e.target.value)}
          placeholder="회의 유형을 설명하세요"
          className="w-full p-2 border border-gray-300 rounded-md mt-1"
        />
      </div>

      <button
        onClick={handleCreateMeeting}
        className="w-full py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
      >
        생성하기
      </button>
    </div>
  );
}

export default CreateMeetingForm;
