import React, { useState } from "react";
import LLMEngineIcon from "./icons/LLMEngineIcon";
import DotIcon from "./icons/DotIcon";
import { useFormContext } from "../context/FormContext";
function LlmEngine() {
  const { llmEngineData, setLlmEngineData } = useFormContext();

  return (
    <form className="rounded-lg shadow-lg">
      <div className="flex justify-between py-2.5 px-4 items-center text-black font-semibold text-sm">
        <div className="flex justify-center items-center gap-3">
          <LLMEngineIcon />
          LLM ENGINE
        </div>
        <DotIcon />
      </div>

      <div className="px-4 py-2.5 bg-[#EEF4FF] text-[#666666] font-medium text-sm justify-start">
        {"Lorem ipsum sic dolar amet "}
      </div>

      {/* Model Name */}
      <div className="px-4 pt-2.5 flex items-start flex-col">
        <label className="pb-2 text-[#000000] text-sm ">Model Name</label>
        <select
          value={llmEngineData?.modelName}
          onChange={(e) =>
            setLlmEngineData({ ...llmEngineData, modelName: e.target.value })
          }
          className="border-[1px] rounded-[4px] w-full border-solid border-[#666666] px-3 py-1 text-sm font-normal focus:outline-none"
        >
          <option value="">Select model name</option>
          <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
          <option value="text-davinci-003">Text-davinci-003</option>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo-13b">GPT-3.5-Turbo-13B</option>
          <option value="text-davinci-002">Text-davinci-002</option>
          <option value="text-davinci-001">Text-davinci-001</option>
        </select>
      </div>

      {/* OpenAI API Base */}
      <div className="px-4 pt-2.5  flex items-start flex-col">
        <label className="pb-2 text-[#000000] text-sm ">OpenAI API Base</label>
        <input
          type="text"
          className="border-[1px] rounded-[4px] border-solid border-[#666666] px-3 py-1 text-sm font-normal focus:outline-none"
          value={llmEngineData?.apiBase}
          onChange={(e) =>
            setLlmEngineData({ ...llmEngineData, apiBase: e.target.value })
          }
          placeholder="Type something..."
          required
        />
      </div>

      {/* OpenAI Key */}
      <div className="px-4 pt-2.5 flex items-start flex-col">
        <label className="pb-2 text-[#000000] text-sm ">OpenAI Key</label>
        <input
          className="border-[1px] rounded-[4px] border-solid border-[#666666] px-3 py-1 text-sm font-normal focus:outline-none"
          type="password"
          value={llmEngineData?.openAiKey}
          onChange={(e) =>
            setLlmEngineData({ ...llmEngineData, openAiKey: e.target.value })
          }
          placeholder="Type something..."
          required
        />
      </div>

      {/* Max Tokens */}
      <div className="px-4 pt-2.5 flex items-start flex-col">
        <label className="pb-2 text-[#000000] text-sm ">Max Tokens</label>
        <input
          type="text"
          className="border-[1px] rounded-[4px] border-solid border-[#666666] px-3 py-1 text-sm font-normal focus:outline-none"
          value={llmEngineData?.maxTokens}
          onChange={(e) =>
            setLlmEngineData({ ...llmEngineData, maxTokens: e.target.value })
          }
          placeholder="type something"
          required
        />
      </div>

      {/* Temperature */}
      <div className="px-4 pt-2.5 flex items-start flex-col">
        <label className="pb-2 text-[#000000] text-sm ">Temperature</label>
        <input
          type="number"
          className="border-[1px] rounded-[4px] border-solid border-[#666666] px-3 py-1 text-sm font-normal focus:outline-none"
          value={llmEngineData?.temperature}
          onChange={(e) =>
            setLlmEngineData({ ...llmEngineData, temperature: e.target.value })
          }
          required
        />
      </div>

      <div className="pt-4 px-4 pb-2 text-xs text-[#666666] flex justify-start font-medium items-start">
        Input
      </div>
      <div className="pt-2 px-4 pb-4 text-xs text-[#666666] flex justify-end font-medium items-end">
        Output
      </div>
    </form>
  );
}

export default LlmEngine;
