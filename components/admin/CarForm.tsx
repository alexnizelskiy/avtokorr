import type { Car, CarMedia } from "@prisma/client";
import {
  transmissionOptions,
  drivetrainOptions,
  statusOptions,
  countryOptions,
} from "@/lib/car-labels";
import { deletePhotoAction } from "@/app/admin/(dash)/cars/actions";

export function CarForm({
  action,
  car,
  submitLabel = "Сохранить",
}: {
  action: (form: FormData) => void | Promise<void>;
  car?: Car & { media?: CarMedia[] };
  submitLabel?: string;
}) {
  const v = <T,>(x: T | null | undefined, d: T | string = "") => (x ?? d) as string;
  const media = car?.media ?? [];

  return (
    <form action={action} className="car-form">
      <div className="car-form-grid">
        <label className="field">
          <span>Марка *</span>
          <input name="brand" required defaultValue={v(car?.brand)} placeholder="Genesis" />
        </label>
        <label className="field">
          <span>Модель *</span>
          <input name="model" required defaultValue={v(car?.model)} placeholder="GV80" />
        </label>
        <label className="field">
          <span>Поколение</span>
          <input name="generation" defaultValue={v(car?.generation)} placeholder="напр. 3.5T" />
        </label>
        <label className="field">
          <span>Год *</span>
          <input name="year" type="number" required defaultValue={v(car?.year, "2023")} />
        </label>
        <label className="field">
          <span>Пробег, км *</span>
          <input name="mileage" type="number" required defaultValue={v(car?.mileage, "0")} />
        </label>
        <label className="field">
          <span>Цена, ₽ *</span>
          <input name="price" type="number" required defaultValue={car ? String(Number(car.price)) : ""} />
        </label>
        <label className="field">
          <span>Двигатель</span>
          <input name="engine" defaultValue={v(car?.engine)} placeholder="3.5 л · 380 л.с." />
        </label>
        <label className="field">
          <span>Коробка</span>
          <select name="transmission" defaultValue={v(car?.transmission, "AUTOMATIC")}>
            {transmissionOptions.map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Привод</span>
          <select name="drivetrain" defaultValue={v(car?.drivetrain, "AWD")}>
            {drivetrainOptions.map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Цвет</span>
          <input name="color" defaultValue={v(car?.color)} placeholder="чёрный" />
        </label>
        <label className="field">
          <span>Страна</span>
          <select name="country" defaultValue={v(car?.country, "KOREA")}>
            {countryOptions.map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Статус</span>
          <select name="status" defaultValue={v(car?.status, "IN_STOCK")}>
            {statusOptions.map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>VIN</span>
          <input name="vin" defaultValue={v(car?.vin)} />
        </label>
        <label className="field">
          <span>Аукционная оценка</span>
          <input name="auctionGrade" defaultValue={v(car?.auctionGrade)} placeholder="4.5 / B" />
        </label>
        <label className="field">
          <span>Slug (URL)</span>
          <input name="slug" defaultValue={v(car?.slug)} placeholder="авто-заполнится" />
        </label>
        <label className="field">
          <span>Обложка — ссылка (необязательно)</span>
          <input name="cover" defaultValue={v(car?.cover)} placeholder="https://…" />
        </label>
        <label className="field">
          <span>Фото автомобиля (можно несколько)</span>
          <input name="photoFiles" type="file" accept="image/jpeg,image/png,image/webp" multiple />
        </label>
      </div>

      {media.length > 0 && (
        <div className="media-grid">
          {media.map((m) => (
            <div key={m.id} className="media-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt="Фото авто" />
              <form action={deletePhotoAction.bind(null, car!.id, m.id)}>
                <button type="submit" className="media-del" aria-label="Удалить фото">
                  ✕
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      <label className="field">
        <span>Описание</span>
        <textarea name="description" rows={4} defaultValue={v(car?.description)} />
      </label>

      <div className="car-form-checks">
        <label className="check">
          <input type="checkbox" name="fairPrice" defaultChecked={car?.fairPrice ?? false} />
          Бейдж «Справедливая цена»
        </label>
        <label className="check">
          <input type="checkbox" name="isNew" defaultChecked={car?.isNew ?? false} />
          Бейдж «Новый»
        </label>
      </div>

      <button className="btn btn-green" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}
