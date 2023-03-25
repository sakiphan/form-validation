import React, { useState } from "react";

const Input = ({errorTitle}) => {
  //useState hooku kullanarak üç adet state değişkeni tanımladım.
  const [bird, setBird] = useState("");
  const [cat, setCat] = useState("");
  const [dog, setDog] = useState("");

  // Kullanıcıların formun alanlarını doldurmadığı durumlarda hata mesajlarını göstermek için hata durum state'i tanımladım.
  const [birdErr, setBirdErr] = useState(false);
  const [catErr, setCatErr] = useState(false);
  const [dogErr, setDogErr] = useState(false);

  // setAnimalList'i ise inputların değerini güncellemek için kullandım. forma girilen bilgiler animalList dizisine eklenir.
  const [animalList, setAnimalList] = useState([]);

  // Burada ilk önce handleCreateAnimal fonksiyonu tanımladım. Form submit edildiğinde bu fonksiyon çalışır. preventDefault() ile bu formun varsayılan davranışını engelledim.
  const handleCreateAnimal = (e) => {
    e.preventDefault();
    setBirdErr(false);
    setCatErr(false);
    setDogErr(false);
    // if koşulunda form alanlarının dolu olup olmadığını kontrol ediyoruz. Tüm alanlar doluysa newAnimal adında yeni nesne oluşturuyorum ve setAnimalList'i kullanarak bu nesneyi animalList dizisine ekliyorum. push methodu yerine spread operatörü kullanmamızın nedeni Reactın state üstünde direk değişiklik yapmasına karşı çıkmasıdır. push diziye yeni elaman ekleyerek state de direk değişiklik yapar. Spread ise dizinin orjinal halini bozmadan state de güncelleme yapar. Bu nedenle setAnimalList kullanılarak önceki animalList dizisine kopyalanır ve bu yeni diziye newAnimal nesnesi eklenir bu yeni dizi setAnimalList fonksiyonu aracılığıyla animalList stateine atılır. Nesnenin id'si data.now ve math.random methodlarının birleşimi ile benzersiz bir key'e sahip olur.
    if (bird && cat && dog) {
      const newAnimal = {
        id: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
        bird,
        dog,
        cat,
      };
      setAnimalList([...animalList, newAnimal]);
      setBird("");
      setCat("");
      setDog("");
    } else {
      //Eğer formlar boş ise bird,cat ve dog true değeri alır ve mesajın gösterilmesi için setBirdErr ve diğer setler kullanıldı. Böyle olunca animalList dizisine yeni bir öğe eklenmemiş ve form temizlenmemiş oluyor.
      !bird && setBirdErr(true);
      !cat && setCatErr(true);
      !dog && setDogErr(true);
    }
  };
  // Fonksiyona id parametresi verdim ve setAnimalList'i çağırdım. setAnimalList'i değişkeni güncellemek için kullandım. SetAnimalList previousAnimalList'i değerine dayanarak yeni bir durum değişkeni döndürür. previousAnimalList'i dizisini filtrelemek için filter methodunu kullandık. Burada belirtilen koşulu sağlamayan tüm ögeleri kaldırıp yeni bir dizi oluşturmamıza olanak sağlar. Eğer id işlemin aldığı id parametresine eşitse eklenilen hayvan yeni diziye dahil edilmez ve silinmiş gibi davranır.
  const handleDeleteAnimal = (id) => {
    setAnimalList((previousAnimalList) =>
      previousAnimalList.filter((animal) => animal.id !== id)
    );
  };
  return (
    <div>
      <form action="">
        <input
          type="text"
          value={bird}
          placeholder="write a bird name"
          onChange={(event) => setBird(event.target.value)}
        />
        {/* Form doğru şekilde kullanılmazsa, kullanıcıya hata mesajı gösteriyoruz. birdErr değişkeninin durumunu bakıyoruz doğru ise span içindeki mesajı yazdırıyoruz. Formu submit edince birdErr true dönüyor ve mesajı yazdırıyor. */}
        {birdErr && <span>{errorTitle}</span>}

        <input
          type="text"
          value={cat}
          placeholder="write a cat name"
          // Kullanıcı formu her değiştirdiğinde , statenin güncellenmesini ve yeni değer görüntülenmesini sağlıyoruz burada.
          onChange={(event) => setCat(event.target.value)}
        />
        {catErr && <span>{errorTitle}</span>}
        <input
          type="text"
          value={dog}
          placeholder="write a dog name"
          onChange={(event) => setDog(event.target.value)}
        />
        {dogErr && <span>{errorTitle}</span>}
        <input
          type="submit"
          value="Create Animals"
          onClick={handleCreateAnimal}
        />
      </form>
      {/* Burada animalList uzunluğuna kontrol ediyoruz yani eleman içeriyorsa 0 dan büyükse true olur ve map methodu çağırılır. animalList.map methoduyla diziyi döngüye sokarız ve dizi elemanlarını div içinde ekrana yazdırırız. animal nesnesinin özellikleri sırayla li elemanının içinde gösterilir. div'in key özelliği alması ise benzersiz bir anahtar almasını sağlar console hatasını önler. Key özelliği virtual domda hangi öğelerin güncelleyeceğini daha doğru bir şekilde belirtmesinde yardımcı olur ve gereksiz tekrarları önler. Virtual Dom ise gerçek Dom'u sanal olarak temsil eder. React her değişikliğinde derçek DOM'u güncellemek için Virtual Dom ile olan farklılıklara bakar ve yalnızca bu farkları günceller. Burada forEach yerine map methodunu kullanmamızın nedeni ise güncellenen statelerin yeni bir dizi oluşturması için. Aradaki tek fark dizinin elemanları içinde ikiside dolaşır ama map methodu orjinal diziyi bozmadan yeni bir dizi oluşturur. */}

      {animalList.length !== 0 &&
        animalList.map((animal) => (
          <div className="delete-btn-container" key={animal.id}>
            <h4>Animal {animal.id} </h4>
            <ul>
              <li>{animal.bird}</li>
              <li>{animal.cat}</li>
              <li>{animal.dog}</li>
            </ul>
            <button
              onClick={() => handleDeleteAnimal(animal.id)}
              className="delete-btn"
            >
              X
            </button>
          </div>
        ))}
    </div>
  );
};

export default Input;
