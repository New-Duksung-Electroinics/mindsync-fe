import React, { useEffect, useMemo, useState } from "react";

type Props = {
  value?: string;                 // "ESFP" 같은 값 (선택사항)
  onChange: (mbti: string) => void;
  disabled?: boolean;
};

export default function MBTISurvey({ value, onChange, disabled }: Props) {
  const [ei, setEi] = useState<"E" | "I" | "">("");
  const [sn, setSn] = useState<"S" | "N" | "">("");
  const [tf, setTf] = useState<"T" | "F" | "">("");
  const [jp, setJp] = useState<"J" | "P" | "">("");

  // 외부에서 초기값 주면 세팅
  useEffect(() => {
    if (value && value.length === 4) {
      setEi(value[0] as "E" | "I");
      setSn(value[1] as "S" | "N");
      setTf(value[2] as "T" | "F");
      setJp(value[3] as "J" | "P");
    }
  }, [value]);

  const mbti = useMemo(() => [ei, sn, tf, jp].join(""), [ei, sn, tf, jp]);

  useEffect(() => {
    if (ei && sn && tf && jp) onChange(mbti);
    else onChange("");
  }, [mbti, ei, sn, tf, jp, onChange]);

  const Radio = ({
    name,
    options,
    value,
    setValue,
    title,
    caption,
  }: {
    name: string;
    options: { value: string; label: string; hint?: string }[];
    value: string;
    setValue: (v: any) => void;
    title: string;
    caption?: string;
  }) => (
    <fieldset className="rounded-2xl border border-lime-200 bg-white/90 p-4">
      <legend className="font-semibold">{title}</legend>
      {caption && <p className="text-sm text-neutral-600 mt-1">{caption}</p>}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`rounded-xl border px-3 py-2 cursor-pointer ${
              value === opt.value
                ? "border-lime-400 bg-lime-50"
                : "border-lime-200 hover:bg-lime-50"
            }`}
          >
            <input
              type="radio"
              name={name}
              className="mr-2"
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => setValue(e.target.value)}
              disabled={disabled}
            />
            <span className="font-medium">{opt.label}</span>
            {opt.hint && <span className="ml-1 text-xs text-neutral-500">{opt.hint}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold">당신의 회의 스타일은?</h3>
      <p className="text-sm text-neutral-600">
        간단한 설문으로 MBTI를 선택하면, 해당 성향에 맞춰 회의 경험을 개인화할게요.
      </p>

      <Radio
        name="ei"
        title="에너지 방향 (E / I)"
        caption="팀과의 상호작용을 통해 에너지를 얻나요, 아니면 혼자 정리하며 에너지를 충전하나요?"
        options={[
          { value: "E", label: "E (외향)", hint: "이슈 논의/잡담 OK" },
          { value: "I", label: "I (내향)", hint: "핵심 위주, 조용한 진행" },
        ]}
        value={ei}
        setValue={setEi}
      />

      <Radio
        name="sn"
        title="정보 수집 (S / N)"
        caption="사실 기반으로 보나요, 가능성과 패턴을 보나요?"
        options={[
          { value: "S", label: "S (감각)", hint: "구체적 자료 선호" },
          { value: "N", label: "N (직관)", hint: "아이디어/큰그림" },
        ]}
        value={sn}
        setValue={setSn}
      />

      <Radio
        name="tf"
        title="판단 기준 (T / F)"
        caption="논리와 원칙 vs. 사람과 관계, 무엇을 더 중시하나요?"
        options={[
          { value: "T", label: "T (사고)", hint: "근거/효율" },
          { value: "F", label: "F (감정)", hint: "배려/합의" },
        ]}
        value={tf}
        setValue={setTf}
      />

      <Radio
        name="jp"
        title="생활 양식 (J / P)"
        caption="계획적으로 정리 vs. 유연하게 탐색 중 어떤 쪽인가요?"
        options={[
          { value: "J", label: "J (판단)", hint: "시간관리/체크리스트" },
          { value: "P", label: "P (인식)", hint: "자유롭게 토론" },
        ]}
        value={jp}
        setValue={setJp}
      />

      <div className="text-sm text-neutral-600">
        선택 결과: <span className="font-semibold text-lime-700">{mbti || "미완료"}</span>
      </div>
    </section>
  );
}
