import { Route, Routes } from 'react-router-dom';
import { Create } from './Create';
import { Details } from './Details';
import { Edit } from './Edit';
import { Error } from './Error';
import { Historic } from './Historic';
import { Home } from './Home';

export function MainRoutes() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/criar" element={<Create />} />
      <Route path="/detalhes/:id" element={<Details />} />
      <Route path="/editar/:id" element={<Edit />} />
      <Route path="/historico" element={<Historic />} />
      <Route path="*" element={<Error />} />
    </Routes>

  );
}
