//Component to render search results in a neat, presentable way for front-page search-bar

import { SearchProps } from '../types/types';

export default function SearchResult(props : SearchProps){
    return (
        <div className="">
            <img src={props.img_url}/>
            <h3>{props.name}</h3>
        </div>
    )
}