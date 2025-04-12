import React from "react";
import "./Home.css";

export const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Bienvenue sur <span className="highlight">DriveEase</span>...
          </h1>
          <p className="hero-description">
            Louez ou mettez en location une voiture en toute simplicité. Que
            vous soyez loueur ou client, trouvez ou publiez une annonce en
            quelques clics. Commencez dès maintenant !
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Espace Loueur</button>
            <button className="btn-primary">Espace Client</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/cars/homeCar.png" alt="Car" width={"90%"} />
        </div>
      </div>
      <div className="chooseSection">
        <div className="card">
          <img src="/images/logos/dispo.png" alt="" />
          <h3>Disponibilité</h3>
          <p>
            Le diamant du confort est en effet un atout précieux pour l'esprit.
            Celui qui recherche l'élégance doit sans cesse s'efforcer de
            l'atteindre.
          </p>
        </div>
        <div className="card">
          <img src="/images/logos/confort.png" alt="" />
          <h3>Confort</h3>
          <p>
          L'autorité de la grossesse stimule l'effort du malheur, tout
           en favorisant une avancée ordonnée vers la prospérité.
          </p>
        </div>
        <div className="card">
          <img src="/images/logos/eco.png" alt="" />
          <h3>Économies</h3>
          <p>
          Le prix de la réussite est élevé, mais il est récompensé par un confort
           et une stabilité qui apportent un progrès constant.
          </p>
        </div>
      </div>
      <div className="AboutUs" >
            <div className="imgSection" >
              <img src="/images/attract/menwomen.png" alt="" />
            </div>
            <div className="AboutUsText" >
                <div className="card" >
                    <p className="title" > <span>1</span>  Réservation en moins de 5 minutes </p>
                    <p className="paragraphe">Effectuez votre réservation en moins de 5 minutes grâce à une interface intuitive et simplifiée.</p>
                </div>
                <div className="card" >
                    <p className="title"> <span>2</span>  Disponibilité dans plusieurs villes</p>
                    <p className="paragraphe">Trouvez facilement une voiture à louer près de chez vous, où que vous soyez.</p>
                </div>
                <div className="card" >
                    <p className="title"> <span>3</span>  Des prix compétitifs </p>
                    <p className="paragraphe" >Profitez des meilleurs prix sans frais cachés pour une expérience de location en toute sérénité.</p>
                </div>
                <div className="card" >
                    <p className="title"> <span>4</span> Transactions sécurisées </p>
                    <p className="paragraphe"> Toutes vos informations et paiements sont protégés pour garantir une location en toute confiance.</p>
                </div>
            </div>
      </div>
      <div className="carSection" >
        <div className="carSectionHeader" >
          <h1>Choisissez La Voiture qui Vous Convient</h1>
          <a href="">View All</a>
        </div>
        <div className="carSectionCards" >
            <div className="carSectionCard" >
              <div className="carImg" >
                  <img src="/images/cars/car1.png" alt="" />
              </div>
              <div className="carInfo" >
                    <div>
                      <h3>Mercedes</h3>
                      <h4>25$</h4>
                    </div>
                    <div>
                       <p>sedan</p> 
                       <p>per Day</p>
                    </div>
                    <div>
                      <div className="condtionSections" >
                        <div><p>Condition 1</p></div>
                        <div><p>Condition 2</p></div>
                        <div><p>Condition 3</p></div>
                      </div>                      
                    </div>
                    <div>
                        <button>Views Details</button>
                    </div>
              </div>
            </div>
            <div className="carSectionCard" >
              <div className="carImg" >
                  <img src="/images/cars/car1.png" alt="" />
              </div>
              <div className="carInfo" >
                    <div>
                      <h3>Mercedes</h3>
                      <h4 style={{color:'#5937E0'}} >25$</h4>
                    </div>
                    <div>
                       <p>sedan</p> 
                       <p>per Day</p>
                    </div>
                    <div>
                      <div className="condtionSections" >
                        <div><p>Condition 1</p></div>
                        <div><p>Condition 2</p></div>
                        <div><p>Condition 3</p></div>
                      </div>                      
                    </div>
                    <div>
                        <button>Views Details</button>
                    </div>
              </div>
            </div>
            <div className="carSectionCard" >
              <div className="carImg" >
                  <img src="/images/cars/car1.png" alt="" />
              </div>
              <div className="carInfo" >
                    <div>
                      <h3>Mercedes</h3>
                      <h4 style={{color:'#5937E0'}} >25$</h4>
                    </div>
                    <div>
                       <p>sedan</p> 
                       <p>per Day</p>
                    </div>
                    <div>
                      <div className="condtionSections" >
                        <div><p>Condition 1</p></div>
                        <div><p>Condition 2</p></div>
                        <div><p>Condition 3</p></div>
                      </div>                      
                    </div>
                    <div>
                        <button>Views Details</button>
                    </div>
              </div>
            </div>
            <div className="carSectionCard" >
              <div className="carImg" >
                  <img src="/images/cars/car1.png" alt="" />
              </div>
              <div className="carInfo" >
                    <div>
                      <h3>Mercedes</h3>
                      <h4>25$</h4>
                    </div>
                    <div>
                       <p>sedan</p> 
                       <p>per Day</p>
                    </div>
                    <div>
                      <div className="condtionSections" >
                        <div><p>Condition 1</p></div>
                        <div><p>Condition 2</p></div>
                        <div><p>Condition 3</p></div>
                      </div>                      
                    </div>
                    <div>
                        <button>Views Details</button>
                      </div>
              </div>
            </div>
            <div className="carSectionCard" >
              <div className="carImg" >
                  <img src="/images/cars/car1.png" alt="" />
              </div>
              <div className="carInfo" >
                    <div>
                      <h3>Mercedes</h3>
                      <h4>25$</h4>
                    </div>
                    <div>
                       <p>sedan</p> 
                       <p>per Day</p>
                    </div>
                    <div>
                      <div className="condtionSections" >
                        <div><p>Condition 1</p></div>
                        <div><p>Condition 2</p></div>
                        <div><p>Condition 3</p></div>
                      </div>                      
                    </div>
                    <div>
                        <button>Views Details</button>
                      </div>
              </div>
            </div>
            <div className="carSectionCard" >
              <div className="carImg" >
                  <img src="/images/cars/car1.png" alt="" />
              </div>
              <div className="carInfo" >
                    <div>
                      <h3>Mercedes</h3>
                      <h4>25$</h4>
                    </div>
                    <div>
                       <p>sedan</p> 
                       <p>per Day</p>
                    </div>
                    <div>
                      <div className="condtionSections" >
                        <div><p>Condition 1</p></div>
                        <div><p>Condition 2</p></div>
                        <div><p>Condition 3</p></div>
                      </div>                      
                    </div>
                    <div>
                        <button>Views Details</button>
                      </div>
              </div>
            </div>
            <div className="carSectionCard" >
              <div className="carImg" >
                  <img src="/images/cars/car1.png" alt="" />
              </div>
              <div className="carInfo" >
                    <div>
                      <h3>Mercedes</h3>
                      <h4>25$</h4>
                    </div>
                    <div>
                       <p>sedan</p> 
                       <p>per Day</p>
                    </div>
                    <div>
                      <div className="condtionSections" >
                        <div><p>Condition 1</p></div>
                        <div><p>Condition 2</p></div>
                        <div><p>Condition 3</p></div>
                      </div>                      
                    </div>
                    <div>
                        <button>Views Details</button>
                      </div>
              </div>
            </div>
            <div className="carSectionCard" >
              <div className="carImg" >
                  <img src="/images/cars/car1.png" alt="" />
              </div>
              <div className="carInfo" >
                    <div>
                      <h3>Mercedes</h3>
                      <h4>25$</h4>
                    </div>
                    <div>
                       <p>sedan</p> 
                       <p>per Day</p>
                    </div>
                    <div>
                      <div className="condtionSections" >
                        <div><p>Condition 1</p></div>
                        <div><p>Condition 2</p></div>
                        <div><p>Condition 3</p></div>
                      </div>                      
                    </div>
                    <div>
                        <button>Views Details</button>
                      </div>
              </div>
            </div>
            <div className="carSectionCard" >
              <div className="carImg" >
                  <img src="/images/cars/car1.png" alt="" />
              </div>
              <div className="carInfo" >
                    <div>
                      <h3>Mercedes</h3>
                      <h4>25$</h4>
                    </div>
                    <div>
                       <p>sedan</p> 
                       <p>per Day</p>
                    </div>
                    <div>
                      <div className="condtionSections" >
                        <div><p>Condition 1</p></div>
                        <div><p>Condition 2</p></div>
                        <div><p>Condition 3</p></div>
                      </div>                      
                    </div>
                    <div>
                        <button>Views Details</button>
                      </div>
              </div>
            </div>
        </div>
      </div>
      <div className="OtherInfoSection" >
        <div className="backgroundCar" >
        <img src="/images/cars/carBackground.png" alt="" />
        </div>
        <div className="OtherInfo" >
          <h1>Les faits en chiffres</h1>
          <p>Découvrez en un coup d'œil nos statistiques clés : nombre de véhicules disponibles, loueurs actifs et réservations effectuées. Faites confiance à notre plateforme pour une location simple et sécurisée !</p>

        </div>
        <div className="OtherInfoCards" >
            <div className="OtherInfoCard" >
              <img src="/images/icons/icon1.png" alt="" />
              <div>
                <strong>540+</strong>
                <p>Cars</p>
              </div>
            </div>
            <div className="OtherInfoCard" >
              <img src="/images/icons/icon2.png" alt="" />
              <div>
                <strong>20k+</strong>
                <p>Customers</p>
              </div>
            </div>
            <div className="OtherInfoCard" >
              <img src="/images/icons/icon3.png" alt="" />
              <div>
                <strong>25+</strong>
                <p>Years</p>
              </div>
            </div>
            <div className="OtherInfoCard" >
              <img src="/images/icons/icon4.png" alt="" />
              <div>
                <strong>20m+</strong>
                <p>Miles</p>
              </div>
            </div>
        </div>

      </div>

    </div>
  );
};
