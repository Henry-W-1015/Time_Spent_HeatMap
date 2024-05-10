export async function createUser(name, week, data) {
    const response = await fetch(`/create?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, week: week, data: data}),
    });

    const datas = await response.json();
    return datas;
}

export async function readUser(name, week) {
try {
    const response = await fetch(`/read?name=${name}&week=${week}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
} catch (err) {
    console.log(err);
}
}

export async function updateData(name, week, data) {

try {
    const response = await fetch(`/update?name=${name}&week=${week}`,{
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, week: week, data: data}),
    });
    const result = await response.json();
    return result;
} catch (error) {
    console.log(error)
}

}

export async function deleteData(name, week) {
try {
    const response = await fetch(`/delete?name=${name}&week=${week}`,{
    method: 'DELETE',
    });
    const data = await response.json();
    return data;
} catch (error) {
    console.log(error)
}

}

export async function readAllData() {
    const response = await fetch(`/dump`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}
