import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Note } from '../App';

type NoteLayoutProps = {
  notes: Note[];
};

const NoteLayout = ({ notes }: NoteLayoutProps) => {
  //take id from url with useParams
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);
  console.log(note);

  if (note == null) {
    return <Navigate to={'/'} replace />;
  } else {
    return <Outlet context={note} />;
  }
};
export default NoteLayout;
