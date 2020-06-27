import React, {useState} from 'react'

export default props => {
    const [value, setValue] = useState('')
    const valueChangeHandler = event => {
        setValue(event.target.value)
      }

    return (
      <>
        <div className="input-group mb-3 mt-3">
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-secondary"
              onClick={() => props.onSearch(value)}
            >
              Искать
            </button>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={valueChangeHandler}
            value={value}
          />
        </div>

        <p className="text-center">
            Поиск покажет любые подходящие значения. Если нет совпадений,
            тогда все данные.
        </p>
        <p className="text-center">Чтобы отсортировать, нажмите на заголовок.</p>
          <p className="text-center">Вы можете добавлять несколько пользователей подряд, для обновления таблицы, нажмите "закрыть и добавить"</p>
      </>
    );
}