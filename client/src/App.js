import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./authContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Home";

//GiftRequest modules
import DisplayAllGiftRequestsTabular from "./pages/request/GiftRequests";
import CreateGiftRequest from "./pages/request/CreateGiftRequest";
import ViewGiftRequest from "./pages/request/ViewGiftRequest";
import TrackGiftRequest from "./pages/request/TrackGiftRequest";

//Gift modules
import DisplayAllGiftsTabular from "./pages/gift/Gifts";
import CreateGift from "./pages/gift/CreateGift";
import ViewGift from "./pages/gift/ViewGift";
import EditGift from "./pages/gift/EditGift";

//Interest modules
import DisplayAllInterestsTabular from "./pages/interest/Interests";
import CreateInterest from "./pages/interest/CreateInterest";
import EditInterest from "./pages/interest/EditInterest";
import ViewInterest from "./pages/interest/ViewInterest";
import EditInterestsGifts from "./pages/interest/EditInterestsGifts";

//Person modules
import DisplayAllPersonsTabular from "./pages/person/Persons";
import CreatePerson from "./pages/person/CreatePerson";
import EditPerson from "./pages/person/EditPerson";
import ViewPerson from "./pages/person/ViewPerson";
import EditPersonsInterests from "./pages/person/EditPersonsInterests";
import EditGifts from "./pages/person/EditGifts";

//EditPersonsInterests
function App() {

  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
      if (!user) {
          return <Login title="Login to Create" />;
      } else {
          return children;
      }
  };

  return (
        <BrowserRouter>
            <Routes>

                <Route path="/GiftRequests"             element={<ProtectedRoute><DisplayAllGiftRequestsTabular /></ProtectedRoute>} />
                <Route path="/CreateGiftRequest"        element={<ProtectedRoute><CreateGiftRequest /></ProtectedRoute>} />
                <Route path="/TrackGiftRequest/:id"     element={<ProtectedRoute><TrackGiftRequest /></ProtectedRoute>} />
                <Route path="/ViewGiftRequest/:id"      element={<ProtectedRoute><ViewGiftRequest /></ProtectedRoute>} />

                <Route path="/Gifts"                    element={<ProtectedRoute><DisplayAllGiftsTabular /></ProtectedRoute>} />
                <Route path="/CreateGift"               element={<ProtectedRoute><CreateGift /></ProtectedRoute>} />
                <Route path="/EditGift/:id"             element={<ProtectedRoute><EditGift /></ProtectedRoute>} />
                <Route path="/ViewGift/:id"             element={<ProtectedRoute><ViewGift /></ProtectedRoute>} />

                <Route path="/Interests"                element={<ProtectedRoute><DisplayAllInterestsTabular /></ProtectedRoute>} />
                <Route path="/CreateInterest"           element={<ProtectedRoute><CreateInterest /></ProtectedRoute>} />
                <Route path="/EditInterest/:id"         element={<ProtectedRoute><EditInterest /></ProtectedRoute>} />
                <Route path="/ViewInterest/:id"         element={<ProtectedRoute><ViewInterest /></ProtectedRoute>} />
                <Route path="/EditInterestsGifts/:id"   element={<ProtectedRoute><EditInterestsGifts /></ProtectedRoute>} />

                <Route path="/Persons"                  element={<ProtectedRoute><DisplayAllPersonsTabular /></ProtectedRoute>} />
                <Route path="/CreatePerson"             element={<ProtectedRoute><CreatePerson /></ProtectedRoute>} />
                <Route path="/EditPerson/:id"           element={<ProtectedRoute><EditPerson /></ProtectedRoute>} />
                <Route path="/ViewPerson/:id"           element={<ProtectedRoute><ViewPerson /></ProtectedRoute>} />
                <Route path="/EditPersonsInterests/:id" element={<ProtectedRoute><EditPersonsInterests /></ProtectedRoute>} />
                <Route path="/EditGifts/:id"            element={<ProtectedRoute><EditGifts /></ProtectedRoute>} />

                <Route path="/"                         element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                <Route path="/login"                    element={<Login />} />
                <Route path="/register"                 element={<Register />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
