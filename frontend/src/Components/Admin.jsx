import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [banner, setBanner] = useState([]);

  const getAllBanners = async () => {
    const url = `http://127.0.0.1:8000/banner/all`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const parsedResponse = await response.json();
    console.log(parsedResponse)
    setBanner(parsedResponse);
  }

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  const deleteBanner = async (bannerId) => {
    const url = `http://127.0.0.1:8000/banner/${bannerId}`;
    console.log(url)
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(response)
    const parsedResponse = await response.json();
    console.log(parsedResponse)
    getAllBanners();
  }

  useEffect(() => {
    getAllBanners();
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const formData = {
        id: null,
        title: e.target.bannerTitle.value,
        description: e.target.bannerDesc.value,
        target_datetime: e.target.bannerTime.value.replace("T", " "),
        banner_link: e.target.bannerLink.value,
        visible: e.target.visibility.checked
      };
      console.log(formData);
      const url = `http://127.0.0.1:8000/banner`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const parsedResponse = await response.json();
      console.log(parsedResponse)

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      form.reset();

      getAllBanners();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const toggleVisibility = async (bannerId) => {
    const url = `http://127.0.0.1:8000/banner/${bannerId}`;
    console.log(url)
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(response)
    const parsedResponse = await response.json();
    console.log(parsedResponse)
    getAllBanners();
  };


  return (
    <>
      <div className="container">
        <h3 className='my-2 text-center'>Add new banner</h3>
        <form id="form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="bannerTitle" className="form-label">Enter banner title</label>
            <input type="text" className="form-control" id="bannerTitle" placeholder="Enter banner title" />
          </div>
          <div className="mb-3">
            <label htmlFor="bannerDesc" className="form-label">Enter banner description</label>
            <input type="text" className="form-control" id="bannerDesc" placeholder="Enter banner description" />
          </div>
          <div className="mb-3">
            <label htmlFor="bannerLink" className="form-label">Enter banner link</label>
            <input type="text" className="form-control" id="bannerLink" placeholder="Enter banner link" />
          </div>
          <div className="mb-3">
            <label htmlFor="bannerTime" className="form-label">Enter target date and time</label>
            <input type="datetime-local" className="form-control" id="bannerTime" placeholder="Enter banner time" />
          </div>
          <div className="mb-3">
            <input className="form-check-input" type="checkbox" value="" id="visibility" />
            <label className="form-check-label ms-2" htmlFor="visibility">
              Visible
            </label>
          </div>
          <button className="btn btn-primary" type='submit'>Submit</button>
        </form>

        {banner.length > 0 ?
          <>
            <h3 className="my-2 text-center">Showing all banners info</h3>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Visible</th>
                  <th scope="col">Toggle Visibility</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {banner.map(item => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td>{truncateString(item.title, 25)}</td>
                      <td>{truncateString(item.description, 50)}</td>
                      <td>{item.visible===0?"No":"Yes"}</td>
                      <td><button className="btn btn-sm btn-warning" onClick={() => toggleVisibility(item.id)}>Toggle visibility</button></td>
                      <td><button className="btn btn-sm btn-danger" onClick={() => confirm(`Are you sure you want to delete banner ${item.title}`) && deleteBanner(item.id)}>Delete</button></td>
                    </tr>
                  )
                })}

              </tbody>
            </table>
          </> :
          <h5 className='text-center my-2'>No banners to display</h5>
        }
      </div>
    </>
  )
}

export default Admin