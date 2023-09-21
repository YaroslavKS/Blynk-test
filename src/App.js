import {initialData} from './service/initialData'
import Aside from './components/Aside/Aside';
import { PageContent } from './components/PageContent/PageContent';
import { useLocalStorage } from './service/useLocalStorage';
import { useState } from 'react';
import { ItemsContext } from './service/ItemsContext';
import './App.scss';


function App() {
  const [items, setItems] = useLocalStorage('items', initialData);
  const [activeItem, setActiveItem] = useState(items[0]?.id || 0);

  const getId = (count) => {
    const newId = +String(+new Date()).slice(-`${count}`);
    return newId;
  }

  const removeItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    if (id === activeItem) {
      setActiveItem(items[0].id);
    }
  }

  const addNewItem = (text) => {
    const newId = getId(9);
    const newItem = {
      id: newId,
      text,
      comments: [],
    }

    setItems([...items, newItem]);
  }

  const addNewComment = (text, color) => {
    const newItemId = getId(5);
    const newComment = {
      itemId: activeItem,
      commentId: newItemId,
      commentText: text,
      color,
    }

    const targetItem = items.find((item) => item.id === activeItem);
    targetItem.comments = [...targetItem.comments, newComment];

    const updatedItems = items.map(item => {
      if (item.id !== activeItem) {
        return item;
      }
      return {
        ...targetItem
      }
    })

    setItems(updatedItems);
  }


  return (
    <div className="App">
      <div className="App-main">
        <ItemsContext.Provider value={{
          items,
          activeItem,
          setActiveItem,
          removeItem,
          addNewItem,
          addNewComment
        }}>
          <Aside />
          <PageContent />
        </ItemsContext.Provider>
      </div>
    </div>
  );
}

export default App;

