import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, of, observable } from 'rxjs';
import { ApiResult } from './Interface/ApiResult';
import { callbackFunc } from './Type/callbackFunc';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  private global_url = 'https://api-us.biohub.tech/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

// --------------- ******************** User ******************** ------------------//

  rawFire(point: string, method: string, params: object, errorHandler: Function) {
    const apiURL = `${this.global_url}/${point}`;
    method = method.toLowerCase();
    let ret = new Observable;
    if (method === 'get' && params !== null) {
      ret = this.http.get(apiURL, this.httpOptions);
    } else if (method === 'post') {
      ret = this.http.post(apiURL, params, this.httpOptions);
    } else if (method === 'options') {
      ret = this.http.options(apiURL, this.httpOptions);
    } else if (method === 'patch') {
      ret = this.http.patch(apiURL, params, this.httpOptions);
    } else if (method === 'delete') {
      ret = this.http.delete(apiURL, this.httpOptions);
    } else {
      ret = this.http.get(apiURL,
      { headers: this.httpOptions.headers,
        params: params as HttpParams,
        withCredentials: true});
    }
    return ret;
  }

  fire(point: string, method: string, params: object, callback: callbackFunc) {

    const errorHandler = function(error) {
      const result = new ApiResult;
      result.success = false;
      result.data = error.error;
      result.status = error.status;
      callback(result);
    };

    const successHandler = function(data) {
      const result = new ApiResult;
      result.success = true;
      result.data = data;
      result.status = 200;
      callback(result);
    };

    this.rawFire(point, method, params, errorHandler).subscribe(
      data => successHandler(data),
      error => errorHandler(error)
    );
  }


  ///////////////////// User //////////////////////////////////////////
  get_simuser_by_id(id: number, callback: callbackFunc) {
    // get stat by id
    this.fire(`users/${id}/stat`, 'get', null, callback);
  }

  user_login(username: string, password: string, callback: callbackFunc) {
    // user login
    const params = {
      username: username,
      password: password
    };
    this.fire('users/login/', 'post', params, callback);
  }

  user_logout(callback: callbackFunc) {
    // user logout
    this.fire('users/logout/', 'get', null, callback);
  }

  update_password(old_password: string, new_password: string, callback: callbackFunc) {
    const params = {
      old: old_password,
      new1: new_password,
      new2: new_password
    };
    this.fire('users/change_password/', 'post', params, callback);
  }

  user_register(username: string, password: string, email: string, callback: callbackFunc) {
    // create a new user
    const params = {
      username: username,
      password: password,
      email: email,
    };
    this.fire('users/register/', 'post', params, callback);
  }

  update_profile(avatar_url: string, actualname: string, location: string, description: string, organization: string,
    // update self profile
    // will be updated:
    //   actualname: "aaa"
    // will not be updated
    //   actualname: null
    email: string, callback: callbackFunc) {
      const params = {
        avatar_url: avatar_url,
        actualname: actualname,
        location: location,
        description: description,
        organization: organization,
        email: email
      };
      console.log(params);
      this.fire('users/me/', 'patch', params, callback);
    }

    update_actualname(actualname: string, callback: callbackFunc) {
      const params = {
        actualname: actualname
      };
      this.fire('users/actualname/', 'post', params, callback);
    }

  get_all_users(callback: callbackFunc) {
    // get all users
    this.fire('users/', 'get', null, callback);
  }

  get_user_by_id(id: number|string, callback: callbackFunc) {
    // get user by id
    this.fire(`users/${id}/`, 'get', null, callback);
  }

  get_myself(callback: callbackFunc) {
    // get myself
    this.fire(`users/me/`, 'get', null, callback);
  }

  delete_user_by_id(id: number, callback: callbackFunc) {
    // delete user from the server
    throw new Error('Not Implemented');
  }

  follow_user_by_id(user_id: number, callback: callbackFunc) {
    // follow somebody by id
    this.fire(`users/${user_id}/follow/`, 'post', null, callback);
  }

  unfollow_user_by_id(user_id: number, callback: callbackFunc) {
    // follow somebody by id
    this.fire(`users/${user_id}/unfollow/`, 'post', null, callback);
  }

  get_followers_by_id(user_id: number, callback: callbackFunc) {
    // get someone's followers
    this.fire(`users/${user_id}/followers/`, 'get', null, callback);
  }

  get_followings_by_id(user_id: number, callback: callbackFunc) {
    // get someone's followings
    this.fire(`users/${user_id}/following/`, 'get', null, callback);
  }



/////////////////////////// Report //////////////////////////////////////////
  get_report_list_by_userid(user_id: number, callback: callbackFunc) {
    this.fire(`users/reports/${user_id}/`, 'get', null, callback);
}
  get_report_simple(report_id: number, callback: callbackFunc) {
    this.fire(`reports-simple/${report_id}`, 'get', null, callback);
  }










///////////////////////// Editor /////////////////////////////////////////
  // get all my steps
  get_all_my_steps(callback: callbackFunc) {
    this.fire('editor/step/', 'get', null, callback);
  }

  // get step by id
  get_step_by_id(id: number, callback: callbackFunc) {
    this.fire(`editor/step/${id}/`, 'get', null, callback);
  }

  create_step(step: object, callback: callbackFunc) {
    // create new step
    this.fire(`editor/step/`, 'post', step, callback);
  }

  delete_step(id: number, callback: callbackFunc) {
    // delete step by id
    this.fire(`editor/step/${id}/`, 'delete', null, callback);
  }

  update_step(id: number, step: object, callback: callbackFunc) {
    // update step
    this.fire(`editor/step/${id}/`, 'patch', step, callback);
  }

  get_all_my_subroutines(callback: callbackFunc) {
    // get all my subroutines
    this.fire(`editor/subroutine/`, 'get', null, callback);
  }

  get_subroutine_by_id(id: number, callback: callbackFunc) {
    this.fire(`editor/subroutine/${id}/`, 'get', null, callback);
  }

  create_subroutine(subroutine: object, callback: callbackFunc) {
    // create new subroutine
    this.fire(`editor/subroutine/`, 'post', subroutine, callback);
  }

  delete_subroutine(id: number, callback: callbackFunc) {
    // delete subroutine by id
    this.fire(`editor/subroutine/${id}/`, 'delete', null, callback);
  }

  update_subroutine(id: number, subroutine: object, callback: callbackFunc) {
    // update subroutine
    this.fire(`editor/subroutine/${id}/`, 'patch', subroutine, callback);
  }

  get_report_list_by_user_id(user_id: number, callback: callbackFunc) {
    // get all my reports in editor
    this.fire(`users/reports/${user_id}`, 'get', null, callback);
  }

  get_report_by_id(id: number, callback: callbackFunc) {
    this.fire(`editor/report/${id}`, 'get', null, callback);
  }

  create_report(report: object, callback: callbackFunc) {
    // create new watch-all-info
    this.fire(`editor/report/`, 'post', report, callback);
  }

  delete_report(id: number, callback: callbackFunc) {
    // delete watch-all-info by id
    this.fire(`editor/report/${id}/`, 'delete', null, callback);
  }

  update_report(id: number, report: object, callback: callbackFunc) {
    // update watch-all-info
    this.fire(`editor/report/${id}/`, 'patch', report, callback);
  }

  star(id: number, callback: callbackFunc) {
    const params = {
      id: id
    };
    this.fire(`users/favorites/`, 'post', params, callback);
  }

  unstar(id: number, callback: callbackFunc) {
    const params = {
      id: id
    };
    this.fire(`users/favorites/unstar/`, 'post', params, callback);
  }

  /////////////////////// Notificaiton /////////////////////////
  get_all_my_notifications(callback: callbackFunc) {
    // get all my notifications
    this.fire(`notices/my/`, 'get', null, callback);
  }

  check_new_notifications(callback: callbackFunc) {
    this.fire(`notices/has_new_notifications/`, 'get', null, callback);
  }

  get_popular_reports_by_system(callback: callbackFunc) {
    this.fire(`users/popular-reports-list/`, 'get', null, callback);
  }


  get_labels_by_user_id(user_id: number, callback: callbackFunc) {
    this.fire(`users/labels/${user_id}/`, 'get', null, callback);
  }

  // create_label(label)

  query_label(label_id: number, callback: callbackFunc) {
    this.fire(`editor/label/${label_id}/`, 'get', null, callback);
  }

  get_all_my_favorite_reports(callback: callbackFunc) {
    this.fire(`users/favorites/`, 'get', null, callback);
  }

  get_all_my_feeds(callback: callbackFunc) {
    this.fire(`notices/feeds/`, 'get', null, callback);
  }

  check_new_feeds(callback: callbackFunc) {
    this.fire(`notices/has_new_feeds/`, 'get', null, callback);
  }

  get_active_users(callback: callbackFunc) {
    this.fire('active-users/', 'get', null, callback);
  }

  get_all_my_collections(callback: callbackFunc) {
    this.fire(`users/collections/`, 'get', null, callback);
  }

  add_to_collection(id: number, collection: string, callback: callbackFunc) {
    const params = {
      id: id,
      collection: collection
    };
    this.fire(`users/collect/`, 'post', params, callback);
  }

  remove_from_collection(id: number, callback: callbackFunc) {
    const params = {
      id: id,
    };
    this.fire(`users/uncollect/`, 'post', params, callback);
  }

  get_archives_by_user_id(id: number, callback: callbackFunc) {
    this.fire(`users/reports/archives/${id}/`, 'get', null, callback);
  }

  query_archive(id: number, callback: callbackFunc) {
    this.fire(`editor/archive/${id}/`, 'get', null, callback);
  }
///////////////////// Comment ///////////////////////////////
  create_comment(to_report: number, message: string, to_comment: number, callback: callbackFunc) {
    // to_comment = -1 if there is none
    const params = {
      to_report: to_report,
      message: message,
      to_comment: to_comment
    };
    this.fire(`editor/comment/`, 'post', params, callback);
  }

  get_report_comment(report_pk: number, callback: callbackFunc) {
    this.fire(`editor/comment/get_report_comment/${report_pk}/`, 'get', null, callback);
  }

  /////////////////////// Search Engine /////////////////////////

  get_search_result(s: string, callback: callbackFunc) {
    // const params = new HttpParams().set('s', s);
    this.fire(`search/`, 'post', {'s': s}, callback);
  }

}

