<template>
    <div class="admin">
        <h1>The Admin Page!</h1>
        <div class="heading">
            <div class="circle">1</div>
            <h2>Header Image</h2>
        </div>
        <b-row class="my-1">
            <b-col sm="2">
                <label for="input-default">Header Image:</label>
            </b-col>
            <b-col sm="8">
                <b-form-file v-model="head_file" class="mt-3" plain></b-form-file>
                <div class="mt-3">Selected file: {{ head_file ? head_file.name : '' }}</div>
                <button @click="editItem('header', '', head_file), head_file=null">Upload</button>
            </b-col>
            <b-col>
                <img :src=current_head>
            </b-col>
        </b-row>
        <!-- About Me Text and Pic-->
        <div class="heading">
            <div class="circle">1</div>
            <h2>About Me</h2>
        </div>
        <b-row class="my-1">
            <b-col sm="2">
                <label for="input-default">About Me Text:</label>
            </b-col>
            <b-col sm="5">
                <b-form-textarea id="textarea" v-model="about_text" placeholder="Write something..." rows="3" max-rows="6"></b-form-textarea>
                <b-form-file v-model="about_file" class="mt-3" plain></b-form-file>
                <div class="mt-3">Selected file: {{ about_file ? about_file.name : '' }}</div>
                <button @click="editItem('about', about_text, about_file), about_text='', about_file=null">Edit</button>
            </b-col>
            <b-col>
                <p>{{ current_about_text }}</p>
                <img :src=current_about>
            </b-col>
        </b-row>
        <div class="heading">
            <div class="circle">1</div>
            <h2>Testimonials</h2>
        </div>
        <b-row class="my-1">
            <b-col sm="2">
                <label for="input-default"></label>
            </b-col>
            <b-col sm="4">
                <b-form-input v-model="testimonial_text" placeholder="testimonial"></b-form-input>
                <button @click="upload('testimonial', testimonial_text, null), testimonial_text=''">Add</button>
                <!-- <button @click="editTestimonial">Edit</button> -->
            </b-col>
            <b-col sm="4">
                <b-form-group label="" v-slot="{ ariaDescribedby }" v-for="t in current_testimonials" :key="t.id">
                    <b-form-radio v-model="t.text" :aria-describedby="ariaDescribedby" name="some-radios" :value=t>{{t.text}}</b-form-radio>
                    <input v-model="t.text">
                    <button @click="deleteItem(t)">Delete</button>
                    <button @click="editItem('testimonial', t.text, null)">Save</button>
                </b-form-group>
            </b-col>
        </b-row>
        <div class="heading">
            <div class="circle">1</div>
            <h2>Categories</h2>
        </div>
        <b-row class="my-1">
            <b-col sm="2">
                <label for="input-default"></label>
            </b-col>
            <b-col sm="8">
                <div>
                    <b-form-group label="Category Type" v-slot="{ ariaDescribedby }">
                        <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Couples">Couples</b-form-radio>
                        <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Events">Events</b-form-radio>
                        <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Family">Family</b-form-radio>
                        <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Kids">Kids</b-form-radio>
                        <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Singles">Singles</b-form-radio>
                    </b-form-group>
                    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
                    <b-form-input v-model="price" placeholder="100"></b-form-input>
                </div>
                <p>Current price is {{txtsource()}}</p>
                <img :src=imgsource()>
                <b-form-file v-model="cat_file" class="mt-3" plain></b-form-file>
                <div class="mt-3">Selected file: {{ cat_file ? cat_file.name : '' }}</div>
                <button @click="editItem(selected, price, cat_file), price='', cat_file=null">Edit</button>
            </b-col>
        </b-row>
        <div class="heading">
            <div class="circle">1</div>
            <h2>Photos</h2>
        </div>
        <b-row class="my-1">
            <b-col sm="2">
                <label for="input-default"></label>
            </b-col>
            <b-col sm="8">
                <b-form-file v-model="photo_file" class="mt-3" plain></b-form-file>
                <div class="mt-3">Selected file: {{ photo_file ? photo_file.name : '' }}</div>
                <button @click="upload('photo', '', photo_file)">Upload</button>
            </b-col>
            <b-col sm="4">
                <div v-for="p in current_photos" :key="p.id">
                    <img :src="p.path">
                    <button @click="deleteItem(p)">Delete</button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<style scoped>
    .image h2 {
        font-style: italic;
        font-size: 1em;
    }

    .heading {
        display: flex;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .heading h2 {
        margin-top: 8px;
        margin-left: 10px;
    }

    .add,
    .edit {
        display: flex;
    }

    .circle {
        border-radius: 50%;
        width: 18px;
        height: 18px;
        padding: 8px;
        background: #333;
        color: #fff;
        text-align: center
    }

    /* Form */
    input,
    textarea,
    select,
    button {
        font-family: 'Montserrat', sans-serif;
        font-size: 1em;
    }

    .form {
        margin-right: 50px;
    }

    /* Uploaded images */
    .upload h2 {
        margin: 0px;
    }

    .upload img {
        max-width: 300px;
    }

</style>

<script>
    import axios from 'axios';
    export default {
        name: 'Admin',
        data() {
            return {
                addItem: null,
                items: [],
                findTag: "",
                findItem: null,
                selected: '',
                head_file: null,
                about_text: "",
                about_file: null,
                testimonial_text: '',
                cat_type: "",
                price: "",
                cat_file: null,
                photo_file: null,
                current_head: null,
                current_about_text: "",
                current_about: null,
                current_testimonials: [],
                current_couples: "",
                current_couples_price: "",
                current_events: "",
                current_events_price: "",
                current_family: "",
                current_family_price: "",
                current_kids: "",
                current_kids_price: "",
                current_singles: "",
                current_singles_price: "",
                current_photos: [],
                selected_testimonial: "",
            }
        },
        created() {
            this.getItems();
        },
        methods: {
            imgsource() {
                if (this.selected != "") {
                    return this.selectItem(this.selected).path
                } else {
                    return ""
                }
            },
            txtsource() {
                if (this.selected != "") {
                    return this.selectItem(this.selected).text
                } else {
                    return ""
                }
            },
            fileChanged(event) {
                this.file = event.target.files[0]
            },
            async upload(tag, text, file) {
                try {
                    let r1
                    let r1data
                    if (file != null) {
                        const formData = new FormData();
                        formData.append('photo', file, file.name, file.description)
                        r1 = await axios.post('/api/photos', formData);
                        r1data = r1.data.path
                    } else {
                        r1data = ''
                    }
                    console.log("assigned r1")
                    console.log("moving to r2");
                    let r2 = await axios.post('/api/items', {
                        tag: tag,
                        text: text,
                        path: r1data,
                    });
                    console.log("assigned r2");
                    this.addItem = r2.data;
                    console.log("added item");
                } catch (error) {
                    console.log(error);
                }
            },
            async getItems() {
                try {
                    let response = await axios.get("/api/items");
                    this.items = response.data;
                    this.sortItems();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            sortItems() {
                for (let i = 0; i < this.items.length; i++) {
                    let item = this.items[i];
                    switch (item.tag) {
                        case "header":
                            this.current_head = item.path;
                            break;
                        case "about":
                            this.current_about_text = item.text;
                            this.current_about = item.path;
                            break;
                        case "testimonial":
                            this.current_testimonials.push(item);
                            break;
                        case "Couples":
                            this.current_couples = item.path;
                            this.current_couples_price = item.text;
                            break;
                        case "Events":
                            this.current_events = item.path;
                            this.current_events_price = item.text;
                            break;
                        case "Family":
                            this.current_family = item.path;
                            this.current_family_price = item.text;
                            break;
                        case "Kids":
                            this.current_kids = item.path;
                            this.current_kids_price = item.text;
                            break;
                        case "Singles":
                            this.current_singles = item.path;
                            this.current_singles_price = item.text;
                            break;
                        default:
                            this.current_photos.push(item);
                            break;
                    }
                }
            },
            selectItem(tag) {
                console.log(`finding ${tag}`)
                for (let i = 0; i < this.items.length; i++) {
                    let item = this.items[i]
                    console.log(`found ${item.tag}`)
                    if (item.tag === tag) {
                        this.findItem = item
                        console.log("Done searching")
                        console.log(`findItem.path = ${this.findItem.path}`)
                        return item
                    }
                }
            },
            selectTestimonial(text) {
                console.log(`finding ${text}`)
                for (let i = 0; i < this.items.length; i++) {
                    let item = this.items[i]
                    console.log(`found ${item.text}`)
                    if (item.text === text) {
                        this.selected_testimonial = item
                        console.log("Done searching")
                        console.log(`item.text is ${item.text}`)
                        console.log(`selected_testimonial.text is ${this.selected_testimonial.text}`)
                        return item
                    }
                }
            },
            async deleteItem(item) {
                console.log(`testimonial to delete is ${item.text}`)
                try {
                    await axios.delete("/api/items/" + item._id);
                    // this.findItem = null;
                    this.getItems();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async editItem(tag, text, file) {
                let item = this.selectItem(tag)
                let new_path
                if (text === "") {
                    text = item.text
                }
                if (file === null) {
                    new_path = item.path
                } else {
                    const formData = new FormData();
                    formData.append('photo', file, file.name, file.description)
                    let r1 = await axios.post('/api/photos', formData);
                    new_path = r1.data.path
                }
                try {
                    await axios.put("/api/items/" + item._id, {
                        tag: item.tag,
                        text: text,
                        path: new_path,
                    });
                    this.getItems();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
        }
    }
</script>