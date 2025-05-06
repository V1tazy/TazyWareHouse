import { CATEGORY_LIST } from "@/@libs/data/category";
import { StringArraySelect } from "./SelectBar";
import { STATUS_LIST } from "@/@libs/data/status";
import { SUPLIER_LIST } from "@/@libs/data/suplier";

export default function Filter() {
    return (
      <div className="flex flex-col gap-4">
        
        <StringArraySelect options={STATUS_LIST}></StringArraySelect>

        <StringArraySelect options={CATEGORY_LIST}></StringArraySelect>
        
        <StringArraySelect options={SUPLIER_LIST}></StringArraySelect>
        <div className="flex flex-col gap-2">
          <label>Цена</label>
          <input placeholder="От" className="w-full" />
          <input placeholder="До" className="w-full" />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="bg-[#5138DF] text-white drop-shadow-2xl rounded flex-1 py-2">
            Применить
          </button>
          <button type="submit" className="bg-white text-[#5138DF] drop-shadow-2xl rounded flex-1 py-2">
            Очистить
          </button>
        </div>
      </div>
    );
  }