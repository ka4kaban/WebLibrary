import * as React from 'react';

export class HideReadedBookInput extends React.Component<{
    updateFilter: any
}, {}> {
    public render() {
        return <label className="search-item">
            <span>Скрыть прочитанные книги </span><input type="checkbox" className="checkbox-inline" />
        </label>;
    }
}